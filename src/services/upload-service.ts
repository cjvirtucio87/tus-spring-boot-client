import axios from "axios";
import { FilePart } from "../data/file-part";
import moment, { unitOfTime } from 'moment';
import { ProgressData } from "../data/progress-data";

export class Upload {
    private baseUri: string | undefined;

    public Upload(baseUri: string) {
        this.baseUri = baseUri;
    }

    /**
     * Upload a file part.
     * @param filePart The {@link FilePart} to be uploaded.
     * @param startTime The {@link Date} representing the start time of the upload process.
     */
    public uploadFilePart(filePart: FilePart, startTime: Date): Promise<string> {
        const { partNumber, uploadOffset, uploadLength, file, fileName, fileSize } = filePart;
        const self = this;

        return axios.patch(`${this.baseUri}/upload/file/${fileName}`, file, {
            headers: {
            'content-type': 'text/plain',
            fileName,
            partNumber,
            uploadOffset,
            uploadLength,
            fileSize,
            userName: 'placeholder'
            },
            onUploadProgress(ev) {
                return new ProgressData(
                    partNumber,
                    self.computeProgress(ev.loaded, file.size),
                    self.computeSpeed(ev.loaded, startTime)
                );
            }
        })
        .then(() => "done");
    }
    
    private computeProgress(loaded: number, fileSize: number): number {
        return Math.floor((loaded / fileSize) * 100);
    }
    
    private computeSpeed(loaded: number, startTime: Date) {
        return Math.floor(loaded / ( this.computeElapsedTime('seconds', startTime) ));
    }

    private computeElapsedTime(unit: unitOfTime.Base, startTime: Date): number {
        return moment().diff(startTime, unit) || 1;
    }
}