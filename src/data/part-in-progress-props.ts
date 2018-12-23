import { FileProgress } from "./file-progress";

export class PartInProgressProps {
    public part: FileProgress;
    public progress: number;
    public speed: number;

    constructor(part: FileProgress, progress: number, speed: number) {
        this.part = part;
        this.progress = progress;
        this.speed = speed;
    }
}