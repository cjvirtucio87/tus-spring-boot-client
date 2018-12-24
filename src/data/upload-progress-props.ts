import { ProgressDataCollection } from "./progress-data-collection";
import { FilePart } from "./file-part";

export class UploadProgressProps {
    public parts: FilePart[];
    public progressDataCollection: ProgressDataCollection;

    constructor(parts: FilePart[], progressDataCollection: ProgressDataCollection) {
        this.parts = parts;
        this.progressDataCollection = progressDataCollection;
    }
}