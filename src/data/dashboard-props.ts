import { FileMetadata } from "./file-metadata";
import { FilePart } from "./file-part";
import { ProgressData } from "./progress-data";

export class DashboardProps {
    public onAddFile: Function;
    public onUploadFile: Function;
    public onChunkToggle: Function;
    public fileMetadata: FileMetadata;
    public parts: FilePart[];
    public progressData: ProgressData;
    public uploadDone: boolean;
    public chunked: boolean;

    constructor(onAddFile: Function, onUploadFile: Function, onChunkToggle: Function, fileMetaData: FileMetadata, parts: FilePart[], progressData: ProgressData, uploadDone: boolean, chunked: boolean) {
        this.onAddFile = onAddFile;
        this.onUploadFile = onUploadFile;
        this.onChunkToggle = onChunkToggle;
        this.fileMetadata = fileMetaData;
        this.parts = parts;
        this.progressData = progressData;
        this.uploadDone = uploadDone;
        this.chunked = chunked;
    }
}