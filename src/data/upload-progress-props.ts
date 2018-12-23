import { ProgressDataCollection } from "./progress-data-collection";
import { FileProgress } from "./file-progress";

export class UploadProgressProps {
    public parts: FileProgress[];
    public progressDataCollection: ProgressDataCollection;

    constructor(parts: FileProgress[], progressDataCollection: ProgressDataCollection) {
        this.parts = parts;
        this.progressDataCollection = progressDataCollection;
    }
}