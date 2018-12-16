export class FilePart {
    public file: File;
    public fileName: string;
    public fileExt: string;
    public partNumber: number;
    public uploadOffset: number;
    public uploadLength: number;
    public fileSize: number;

    constructor(
        file: File, 
        fileName: string, 
        fileExt: string, 
        partNumber: number, 
        uploadOffset: number,
        uploadLength: number,
        fileSize: number
    ) {
        this.file = file;
        this.fileName = fileName; 
        this.fileExt = fileExt;
        this.partNumber = partNumber;
        this.uploadOffset = uploadOffset;
        this.uploadLength = uploadLength;
        this.fileSize = fileSize;
    }
}