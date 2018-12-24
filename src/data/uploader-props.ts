import { FilePart } from "./file-part";

export class UploaderProps {
    public onAddFile: Function;
    public onUploadFile: Function;
    public onChunkToggle: Function;
    public parts: FilePart[];
    public chunked: boolean;

    constructor(onAddFile: Function, onUploadFile: Function, onChunkToggle: Function, parts: FilePart[], chunked: boolean) {
        this.onAddFile = onAddFile;
        this.onUploadFile = onUploadFile;
        this.onChunkToggle = onChunkToggle;
        this.parts = parts;
        this.chunked = chunked;
    }
}