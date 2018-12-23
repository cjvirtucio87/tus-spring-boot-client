import * as React from 'react';
import { UploaderProps } from '../../data/uploader-props';

const Uploader = (uploaderProps: UploaderProps) => { 
  const { onAddFile, onUploadFile, onChunkToggle, parts, chunked } = uploaderProps;

  return <div className='Uploader'>
      <label htmlFor='fileUploader'>File Uploader</label>
      <h3>{ chunked ? "CHUNKED MODE" : "SINGLE UPLOAD MODE" }</h3>
      <input id='fileUploader' type='file' onChange={ onAddFile(chunked) } /><br/>
      <button type='button' onClick={ e => onChunkToggle(e) }>Toggle Chunk Upload</button><br/>
      <button type='button' onClick={ onUploadFile(parts) }>Upload</button><br/>
  </div>
};

export default Uploader