export class UpdateUploadHeaders {
    public contentType: string = 'text/plain';
    public fileName: string;
    public fileSize: number;
    public partNumber: number;
    public uploadOffset: number;
    public uploadLength: number;
    public userName: string;

    constructor(
        fileName: string,
        fileSize: number,
        partNumber: number,
        uploadOffset: number, 
        uploadLength: number,
        userName: string) {
        this.fileName = fileName;
        this.fileSize = fileSize;
        this.partNumber = partNumber;
        this.uploadOffset = uploadOffset;
        this.uploadLength = uploadLength;
        this.userName = userName;
    }
}