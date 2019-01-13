import { FileMetadata } from "./file-metadata";
import { ProgressDataCollection } from "./progress-data-collection";
import { FilePart } from "./file-part";

export class DashboardState {
  public file: File;
  public fileMetadata: FileMetadata; 
  public parts: FilePart[];
  public uploadDone: boolean; 
  public chunked: boolean;
  public progressDataCollection: ProgressDataCollection; 

  constructor(file: File, fileMetadata: FileMetadata, parts: FilePart[], uploadDone: boolean, chunked: boolean, progressDataCollection: ProgressDataCollection) {
      this.file = file;
      this.fileMetadata = fileMetadata;
      this.parts = parts;
      this.uploadDone = uploadDone;
      this.chunked = chunked;
      this.progressDataCollection = progressDataCollection;
  }
}