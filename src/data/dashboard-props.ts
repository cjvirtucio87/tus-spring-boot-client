import { FileMetadata } from "./file-metadata";
import { FileProgress } from "./file-progress";
import { ProgressDataCollection } from "./progress-data-collection";

export class DashboardProps {
    public onAddFile: Function;
    public onUploadFile: Function;
    public onChunkToggle: Function;
    public fileMetadata: FileMetadata;
    public parts: FileProgress[];
    public progressDataCollection: ProgressDataCollection;
    public uploadDone: boolean;
    public chunked: boolean;

    constructor(onAddFile: Function, onUploadFile: Function, onChunkToggle: Function, fileMetaData: FileMetadata, parts: FileProgress[], progressDataCollection: ProgressDataCollection, uploadDone: boolean, chunked: boolean) {
        this.onAddFile = onAddFile;
        this.onUploadFile = onUploadFile;
        this.onChunkToggle = onChunkToggle;
        this.fileMetadata = fileMetaData;
        this.parts = parts;
        this.progressDataCollection = progressDataCollection;
        this.uploadDone = uploadDone;
        this.chunked = chunked;
    }
}