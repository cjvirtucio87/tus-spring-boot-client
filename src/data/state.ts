import { FilePart } from "./file-part";
import { FileMetadata } from "./file-metadata";
import { ProgressDataCollection } from "./progress-data-collection";

export class State {
  public parts: FilePart[];
  public uploadDone: boolean;
  public chunked: boolean;
  public fileMetadata: FileMetadata;
  public progressDataCollection: ProgressDataCollection;

  constructor(parts: FilePart[] = [], uploadDone: boolean = false, chunked: boolean = true, fileMetadata: FileMetadata = new FileMetadata(), progressDataCollection: ProgressDataCollection = {}) {
    this.parts = parts;
    this.uploadDone = uploadDone;
    this.chunked = chunked;
    this.fileMetadata = fileMetadata;
    this.progressDataCollection = progressDataCollection;
  }
}