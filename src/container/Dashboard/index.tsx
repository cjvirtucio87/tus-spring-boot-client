/* 
  The most common ancestor will be a 'container' (stateful) component that encapsulates behavior dealing with state.
  All expensive operations will take place in the container component, and will communicate with the store in the process.

  Use the mapStateToProps and mapDispatchToProps to connect this component to the store.
*/

import * as React from 'react';
import { connect } from 'react-redux';

import { PART_SIZE, BASE_URI, FILENAME_PATTERN, FILEEXT_PATTERN } from '../../constants';
import { addFile, updateProgress, finishUpload, toggleChunkMode, setFileMetadata } from '../../actions';

import presentational from '../../presentational/';

import { computeProgress, computeElapsedTime } from '../../utils/local-math';
import axios from 'axios';
import * as moment from 'moment';
import * as Rx from 'rxjs';

import './style.css';

const { Uploader, UploadProgress } = presentational;

// Math
const computeElapsedSeconds = computeElapsedTime('seconds');
const computeSpeed = (loaded, startTime) => Math.floor(loaded / ( computeElapsedSeconds(startTime) ));

const capAtFilesize = (value, fileSize) => value > fileSize ? fileSize : value;

const createFilePart = (file, fileName, fileExt) => (
  {
    file, 
    fileName, 
    fileExt,
    partNumber: 0, 
    uploadOffset: 0, 
    uploadLength: file.size,
    fileSize: file.size
  }
);

const createFileParts = (file, fileName, fileExt, uploadOffset, uploadLength, partNumber, parts) => {
  const fileSize = file.size;
  if (uploadOffset >= file.size) return parts;
  
  parts.push({
    file: file.slice(uploadOffset, uploadLength + 1),
    fileName,
    fileExt,
    partNumber,
    partSize: capAtFilesize(uploadLength, fileSize) - capAtFilesize(uploadOffset, fileSize),
    uploadOffset: capAtFilesize(uploadOffset, fileSize),
    uploadLength: capAtFilesize(uploadLength, fileSize),
    fileSize
  });

  return createFileParts(
    file, 
    fileName, 
    fileExt,
    capAtFilesize(uploadOffset + PART_SIZE, fileSize), 
    capAtFilesize(uploadLength + PART_SIZE, fileSize), 
    partNumber + 1, parts);
}

const onFileNotExist = dispatch => fileName => parts => () => {
  console.log(`File not found. Creating directory for file, ${fileName}`);
  axios.post(`${BASE_URI}/files`, null, {
    headers: {
      fileName
    }
  }).then(({ headers }) => {
    const { filedir } = headers;
    console.log(`Created directory, ${filedir}`);
    dispatch(addFile(parts));
  }).catch(err => {
    console.log(`Error during directory creation for file, ${fileName}`);
    console.log(err);
  });
}

const refreshFileData = data => (p,i) => ({
  ...p,
  file: p.file.slice(data[i]),
  uploadOffset: p.uploadOffset + data[i], 
  loaded: ( data[i] / p.partSize ) * 100
})

const onLoadEnd = dispatch => file => chunked => () => {
  const fileName = FILENAME_PATTERN.exec(file.name)[1];
  const fileExt = FILEEXT_PATTERN.exec(file.name)[0];
  const fileType = file.type;
  const parts = chunked ? createFileParts(file, fileName, fileExt, 0, PART_SIZE, 0, []) : [createFilePart(file, fileName, fileExt)];
  const partNumbers = chunked ? parts.map(part => part.partNumber) : [0];

  axios.get(`${BASE_URI}/file/${fileName}`, {
    headers: {
      fileName,
      fileExt,
      fileType,
      partNumbers
    }
  })
  .then(({ data }) => {
    console.log(`File already exists. Refreshing file data on progress bar for file, ${fileName}`);
    dispatch(addFile(parts.map(refreshFileData(data))));
  })
  .catch(onFileNotExist(dispatch)(fileName)(parts));
}

const onAddFile = dispatch => chunked => event => {
  const reader = new FileReader();
  const file = event.target.files[0];
  reader.onloadend = onLoadEnd(dispatch)(file)(chunked);
  reader.readAsDataURL(file);
  console.log(file.type);
  dispatch(setFileMetadata({ 
      name: FILENAME_PATTERN.exec(file.name)[1], 
      type: file.type, 
      ext: FILEEXT_PATTERN.exec(file.name)[0]
  }));
}

const uploadPart = dispatch => startTime => part => {
  const { partNumber, uploadOffset, uploadLength, file, fileName, fileSize } = part;

  return axios.patch(`${BASE_URI}/file/${fileName}`, file, {
    headers: {
      'content-type': 'text/plain',
      fileName,
      partNumber,
      uploadOffset,
      uploadLength,
      fileSize,
      userName: 'cjvirtucio'
    },
    onUploadProgress(ev) {
      const progress = computeProgress(ev.loaded, file.size);
      const speed = computeSpeed(ev.loaded, startTime);

      dispatch(updateProgress({ partNumber, progress, speed }));
    }
  })
  .then(() => "done")
  .catch(err => {
    console.log("Error during upload patch for file, " + fileName);
    console.log(err);
  });
};

const onPartsComplete = fileName => fileExt => partNumbers => fileSize => dispatch => {
  axios.post(`${BASE_URI}/files/complete`, null, {
    headers: {
      fileName,
      fileExt,
      partNumbers,
      fileSize
    }
  })
  .then(() => dispatch(finishUpload()))
  .catch(err => {
    console.log(`Error during upload concatenation for file, ${fileName}`);
    console.log(err);
  });
}

const onUploadFile = dispatch => parts => event => {
  const startTime = moment();
  const { fileName, fileExt, fileSize } = parts[0];
  const partNumbers = parts.map(p => p.partNumber);
  const len = parts.length;

  const source = Rx.Observable.from(parts)
    .map(uploadPart(dispatch)(startTime))
    .take(len)
    .combineAll();
  
  source.subscribe((doneParts: String[]) => {
    if (doneParts.every(p => p === "done")) {
      onPartsComplete(fileName)(fileExt)(partNumbers)(fileSize)(dispatch);
    }
  });
}

const onChunkToggle = dispatch => event => {
  dispatch(toggleChunkMode());
}

const DownloadBtn = ({ fileMetadata }) => {
  const onClick = () => {
      axios.get('http://localhost:8080/download/file', {
          headers: {
              fileName: fileMetadata.name,
              fileType: fileMetadata.type,
              fileExt: fileMetadata.ext,
              'Accept': fileMetadata.type
          },
          responseType: 'arrayBuffer'
      })
      .then(res => {
          const blob = new Blob([res.data], { type: fileMetadata.type });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', fileMetadata.name);
          document.body.appendChild(link);
          link.click();
      })
      .catch(err => {
          if (err.response) {
              console.log(err.response);
          } else if (err.request) {
              console.log(err.request);
          } else {
              console.log(err.message);
          }
      });
  };

  return <button
    type='button'
    onClick={ onClick }
  >
    Download file
  </button>;
}

// Store Connectors
const mapStateToProps = state => ({
  file: state.file,
  fileMetadata: state.fileMetadata,
  parts: state.parts,
  uploadDone: state.uploadDone,
  chunked: state.chunked,
  progressData: state.progressData
});

const mapDispatchToProps = dispatch => ({
  onAddFile: onAddFile(dispatch),
  onUploadFile: onUploadFile(dispatch),
  onChunkToggle: onChunkToggle(dispatch)
});

const Dashboard = ({ onAddFile, onUploadFile, onChunkToggle, fileMetadata, parts, progressData, uploadDone, chunked }) => (
  <div className='Dashboard container-fluid'>
    <section className='row align-items-center justify-content-center'>
      <div className='col-4'>
        <h3>File Uploader</h3>
        <p>Upload a file. The client slices it into chunks and will fire off a request for each one when you hit the upload button.</p>
      </div>
      <div className='col-4'>
        <Uploader
          onAddFile={ onAddFile }
          onUploadFile={ onUploadFile }
          onChunkToggle={ onChunkToggle }
          chunked={ chunked }
          parts={ parts }
        />
      </div>
    </section>
    <section className='row align-items-center justify-content-center'>
      <div className='col-4'>
        <h3>Upload Progress</h3>
        <p>This component will reveal a table showing the progress of { chunked ? "each chunk." : "the file." }</p>
        <p>{ uploadDone ? "Done!" : (parts ? "Your upload is in progress.." : "") }</p>
        <DownloadBtn fileMetadata={ fileMetadata }/>
      </div>
      <div className='col-4'>
        <UploadProgress
          parts={ parts }
          progressData={ progressData }
        />
      </div>
    </section>
  </div>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
