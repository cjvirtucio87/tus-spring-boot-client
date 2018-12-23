export class FileProgress {
    public file: File;
    public uploadOffset: number;
    public partNumber: number;
    public loaded: number;

    constructor(file: File, uploadOffset: number, partNumber: number, loaded: number) {
        this.file = file;
        this.uploadOffset = uploadOffset;
        this.partNumber = partNumber;
        this.loaded = loaded;
    }
}