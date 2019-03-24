import { FilePart } from "../data/file-part";
import { unitOfTime } from "moment";

export interface UploadService {
    /**
     * Upload a file part asynchronously.
     * @param filePart The {@link FilePart} to be uploaded.
     * @param startTime The {@link Date} representing the start time of the upload process.
     */
    uploadFilePartAsync(filePart: FilePart, onUploadProgress: (ev: any) => void): Promise<string>;
    
    /**
     * Compute the current progress a file, given the number of bytes loaded and its size.
     * @param loaded The number of bytes loaded.
     * @param fileSize The size of the file.
     */
    computeProgress(loaded: number, fileSize: number): number; 

    /**
     * Compute the delta between the current {@link Date} and the given start time.
     * @param unit The unit of time that the delta will be in.
     * @param startTime The {@link Date} that will be considered as the start time.
     * @param endTime The {@link Date} that will be considered as the end time.
     */
    computeElapsedTime(unit: unitOfTime.Base, startTime: Date, endTime: Date): number;
}