import { FilePart } from "./file-part";

export class PartInProgressProps {
    public part: FilePart;
    public progress: number;
    public speed: number;

    constructor(part: FilePart, progress: number, speed: number) {
        this.part = part;
        this.progress = progress;
        this.speed = speed;
    }
}