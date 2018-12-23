export class FileMetadata {
    public name: string;
    public type: string;
    public ext: string;

    constructor(name: string = "", type: string = "", ext: string = "") {
        this.name = name;
        this.type = type;
        this.ext = ext;
    }
}