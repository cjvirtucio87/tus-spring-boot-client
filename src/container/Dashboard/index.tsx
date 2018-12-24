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
import moment, { Moment } from 'moment';
import * as Rx from 'rxjs';

import './style.css';
import { FilePart } from '../../data/file-part';
import { DashboardProps } from '../../data/dashboard-props';
import { DashboardState } from '../../data/dashboard-state';

const { Uploader, UploadProgress, DownloadBtn } = presentational;

// Math
const computeElapsedSeconds = computeElapsedTime('seconds');
const computeSpeed = (loaded: number, startTime: moment.Moment) => Math.floor(loaded / ( computeElapsedSeconds(startTime) ));

const capAtFilesize = (value: number, fileSize: number) => value > fileSize ? fileSize : value;

const createFilePart = (file: Blob, fileName: string, fileExt: string): FilePart => {
  return {
    file, 
    fileName, 
    fileExt,
    loaded: 0,
    partSize: file.size,
    partNumber: 0, 
    uploadOffset: 0, 
    uploadLength: file.size,
    fileSize: file.size
  }
};

const createFileParts = (file: File, fileName: string, fileExt: string, uploadOffset: number, uploadLength: number, partNumber: number, parts: FilePart[]): FilePart[] => {
  const fileSize = file.size;
  if (uploadOffset >= file.size) return parts;
  
  parts.push({
    file: file.slice(uploadOffset, uploadLength + 1),
    fileName,
    fileExt,
    loaded: 0,
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

const onFileNotExist = (dispatch: any) => (fileName: string) => (parts: FilePart[]) => () => {
  console.log(`File not found. Creating directory for file, ${fileName}`);
  axios.post(`${BASE_URI}/upload/files`, null, {
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

const refreshFileData = (data: number[]) => (p: FilePart, i: number) => ({
  ...p,
  file: p.file.slice(data[i]),
  uploadOffset: p.uploadOffset + data[i], 
  loaded: ( data[i] / p.partSize ) * 100
})

const onLoadEnd = (dispatch: any) => (file: File) => (chunked: boolean) => () => {
  if (file == null) {
    throw new Error("file must be of type File, and must not be null");
  }

  const match = FILENAME_PATTERN.exec(file.name);

  if (match == null) {
    throw new Error("invalid filename");
  }

  const fileName = match[1];
  const fileExt = match[0];
  const fileType = file.type;
  const parts = chunked ? createFileParts(file, fileName, fileExt, 0, PART_SIZE, 0, []) : [createFilePart(file, fileName, fileExt)];
  const partNumbers = chunked ? parts.map(part => part.partNumber) : [0];

  axios.get(`${BASE_URI}/upload/file/${fileName}`, {
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

const onAddFile = (dispatch: any) => (chunked: boolean) => (event: any) => {
  const reader = new FileReader();
  const file = event.target.files[0];
  const match = FILENAME_PATTERN.exec(file.name);

  if (match == null) {
    throw new Error(`invalid filename, ${file.name}`)
  }

  reader.onloadend = onLoadEnd(dispatch)(file)(chunked);
  reader.readAsDataURL(file);
  console.log(file.type);
  dispatch(setFileMetadata({ 
      name: match[1], 
      type: file.type, 
      ext: match[0]
  }));
}

const uploadPart = (dispatch: any) => (startTime: moment.Moment) => (part: FilePart) => {
  const { partNumber, uploadOffset, uploadLength, file, fileName, fileSize } = part;

  return axios.patch(`${BASE_URI}/upload/file/${fileName}`, file, {
    headers: {
      'content-type': 'text/plain',
      fileName,
      partNumber,
      uploadOffset,
      uploadLength,
      fileSize,
      userName: 'placeholder'
    },
    onUploadProgress(ev) {
      const progress = computeProgress(ev.loaded, file.size);
      const speed = computeSpeed(ev.loaded, startTime);
      console.log(`Progress for file, ${fileName}: ${progress}%`);

      dispatch(updateProgress({ partNumber, progress, speed }));
    }
  })
  .then(() => "done")
  .catch(err => {
    console.log("Error during upload patch for file, " + fileName);
    console.log(err);
  });
};

const onPartsComplete = (fileName: string) => (fileExt: string) => (partNumbers: number[]) => (fileSize: number) => (dispatch: any) => {
  axios.post(`${BASE_URI}/upload/files/complete`, null, {
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

const onUploadFile = (dispatch: any) => (parts: FilePart[]) => (event: React.MouseEvent<HTMLElement>) => {
  const startTime = moment();
  const { fileName, fileExt, fileSize } = parts[0];
  const partNumbers = parts.map(p => p.partNumber);
  const len = parts.length;

  const source = Rx.Observable.from(parts)
    .map(uploadPart(dispatch)(startTime))
    .take(len)
    .combineAll();
  
  source.subscribe((doneParts: any) => {
    if (doneParts.every((p: string) => p === "done")) {
      onPartsComplete(fileName)(fileExt)(partNumbers)(fileSize)(dispatch);
    }
  });
}

const onChunkToggle = (dispatch: any) => (event: any) => {
  dispatch(toggleChunkMode());
}

// Store Connectors
const mapStateToProps = (state: DashboardState) => ({
  file: state.file,
  fileMetadata: state.fileMetadata,
  parts: state.parts,
  uploadDone: state.uploadDone,
  chunked: state.chunked,
  progressData: state.progressDataCollection
});

const mapDispatchToProps = (dispatch: any) => ({
  onAddFile: onAddFile(dispatch),
  onUploadFile: onUploadFile(dispatch),
  onChunkToggle: onChunkToggle(dispatch)
});

const Dashboard = (dashboardProps: DashboardProps) => {
  const { onAddFile, onUploadFile, onChunkToggle, fileMetadata, parts, progressDataCollection, uploadDone, chunked } = dashboardProps;

  return <div className='Dashboard container-fluid'>
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
          progressDataCollection={ progressDataCollection }
        />
      </div>
    </section>
  </div>
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
