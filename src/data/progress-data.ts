export class ProgressData {
    public partNumber: number;
    public progress: number;
    public speed: number;

    constructor(partNumber: number, progress: number, speed: number) {
        this.partNumber = partNumber;
        this.progress = progress;
        this.speed = speed;
    }
}