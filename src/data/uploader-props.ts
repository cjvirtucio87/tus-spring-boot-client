import { FileProgress } from "./file-progress";

export class UploaderProps {
    public onAddFile: Function;
    public onUploadFile: Function;
    public onChunkToggle: Function;
    public parts: FileProgress[];
    public chunked: boolean;

    constructor(onAddFile: Function, onUploadFile: Function, onChunkToggle: Function, parts: FileProgress[], chunked: boolean) {
        this.onAddFile = onAddFile;
        this.onUploadFile = onUploadFile;
        this.onChunkToggle = onChunkToggle;
        this.parts = parts;
        this.chunked = chunked;
    }
}