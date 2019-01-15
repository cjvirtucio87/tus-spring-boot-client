import { FilePart } from "../data/file-part";
import { ProgressData } from "../data/progress-data";
import { FileMetadata } from "../data/file-metadata";

/* 
  Actions are messages containing with payload for updating state.

  Note the syntax regarding the payload: { file } and { progressData } are synctatic sugar for { file: file } and { progressData: progressData } (ES6 feature).
*/

export const addFile = (parts: FilePart[]) => ({
  type: 'ADD_FILE',
  parts
});

export const updateProgress = (progressData: ProgressData) => ({
  type: 'UPDATE_PROGRESS',
  progressData
});

export const finishUpload = () => ({
  type: 'UPLOAD_DONE'
})

export const toggleChunkMode = () => ({
  type: 'TOGGLE_CHUNK_MODE'
});

export const setFileMetadata = (fileMetadata: FileMetadata) => ({
  type: 'SHOW_FILEMETADATA',
  fileMetadata
});
