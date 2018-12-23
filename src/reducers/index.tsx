/* 
  Reducers are handlers that deal with the messages(actions).

  You can merge multiple reducers using the combineReducers function.
*/

import * as update from 'immutability-helper';
import { ProgressData } from '../data/progress-data';
import { FileMetadata } from '../data/file-metadata';
import { FilePart } from '../data/file-part';

interface ProgressDataCollection {
  [key: number]: ProgressData
}

class State {
  public parts: FilePart[];
  public uploadDone: boolean;
  public chunked: boolean;
  public fileMetadata: FileMetadata;
  public progressDataCollection: ProgressDataCollection;

  constructor(parts: FilePart[], uploadDone: boolean, chunked: boolean = true, fileMetadata: FileMetadata, progressDataCollection: ProgressDataCollection = {}) {
    this.parts = parts;
    this.uploadDone = uploadDone;
    this.chunked = chunked;
    this.fileMetadata = fileMetadata;
    this.progressDataCollection = progressDataCollection;
  }
}

const updateRecord = (state: State, progressData: ProgressData) => {
  const { partNumber, progress, speed } = progressData;

  return {
    ...state,
    progressDataCollection: {
      [partNumber]: {
        partNumber,
        progress,
        speed
      }
    }
  };
};

export const file = (state: State, action) => {
  switch (action.type) {
    case 'ADD_FILE':
      return {
        ...state,
        parts: action.parts
      };
    case 'UPLOAD_PART':
      return {
        ...state,
        part: action.part
      };
    case 'UPDATE_PROGRESS':
      return updateRecord(state, action.progressData);
    case 'UPLOAD_DONE':
      return {
        ...state,
        uploadDone: true
      };
    case 'TOGGLE_CHUNK_MODE':
      return {
        ...state,
        chunked: !state.chunked
      };
    case 'SHOW_FILEMETADATA':
      
      return {
        ...state,
        fileMetadata: action.fileMetadata
      };
    default:
      return state;
  }
};
