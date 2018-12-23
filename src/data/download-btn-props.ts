import { FileMetadata } from "./file-metadata";

export class DownloadBtnProps {
    public fileMetadata: FileMetadata;

    constructor(fileMetadata: FileMetadata) {
        this.fileMetadata = fileMetadata;
    }
}