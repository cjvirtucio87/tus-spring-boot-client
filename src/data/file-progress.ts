export class FileProgress {
    public file: File;
    public fileName: string;
    public uploadOffset: number;
    public partNumber: number;
    public loaded: number;

    constructor(file: File, fileName: string, uploadOffset: number, partNumber: number, loaded: number) {
        this.file = file;
        this.fileName = fileName;
        this.uploadOffset = uploadOffset;
        this.partNumber = partNumber;
        this.loaded = loaded;
    }
}