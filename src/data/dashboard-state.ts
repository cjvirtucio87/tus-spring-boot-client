import { FileMetadata } from "./file-metadata";
import { ProgressDataCollection } from "./progress-data-collection";
import { FileProgress } from "./file-progress";

export class DashboardState {
  public file: File;
  public fileMetadata: FileMetadata; 
  public parts: FileProgress[];
  public uploadDone: boolean; 
  public chunked: boolean;
  public progressDataCollection: ProgressDataCollection; 

  constructor(file: File, fileMetadata: FileMetadata, parts: FileProgress[], uploadDone: boolean, chunked: boolean, progressDataCollection: ProgressDataCollection) {
      this.file = file;
      this.fileMetadata = fileMetadata;
      this.parts = parts;
      this.uploadDone = uploadDone;
      this.chunked = chunked;
      this.progressDataCollection = progressDataCollection;
  }
}