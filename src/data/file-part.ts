export class FilePart {
    public file: Blob;
    public fileName: string;
    public fileExt: string;
    public partNumber: number;
    public partSize: number;
    public uploadOffset: number;
    public uploadLength: number;
    public fileSize: number;

    constructor(
        file: Blob, 
        fileName: string, 
        fileExt: string, 
        partNumber: number, 
        partSize: number,
        uploadOffset: number,
        uploadLength: number,
        fileSize: number
    ) {
        this.file = file;
        this.fileName = fileName; 
        this.fileExt = fileExt;
        this.partNumber = partNumber;
        this.partSize = partSize;
        this.uploadOffset = uploadOffset;
        this.uploadLength = uploadLength;
        this.fileSize = fileSize;
    }
}