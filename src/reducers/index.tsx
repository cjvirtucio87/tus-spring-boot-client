/* 
  Reducers are handlers that deal with the messages(actions).

  You can merge multiple reducers using the combineReducers function.
*/

import { ProgressData } from '../data/progress-data';
import { State } from '../data/state';

const updateRecord = (state: State, progressData: ProgressData) => {
  const newProgressDataCollection = { ...(state.progressDataCollection) };
  newProgressDataCollection[progressData.partNumber] = progressData;

  const newState = {
    ...state,
    progressDataCollection: newProgressDataCollection
  };

  console.log("Reducers.updateRecord vvvv");
  console.log(newState);

  return newState;
};

export const file = (state: State = new State(), action: any) => {
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
