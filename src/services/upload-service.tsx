import { FilePart } from "../data/file-part";
import moment, { unitOfTime } from 'moment';
import { Client } from "../http";
import { UpdateUploadHeaders } from "../data/update-upload-headers";

/** 
 * Service for handling file uploads.
*/
export class Upload {
    private client: Client;

    /**
     * Initializes an instance of {@link services.Upload}.
     * @param client The {@link http.Client} for making calls over the network.
     */
    constructor(client: Client) {
        this.client = client;
    }

    /**
     * Upload a file part asynchronously.
     * @param filePart The {@link FilePart} to be uploaded.
     * @param startTime The {@link Date} representing the start time of the upload process.
     */
    public uploadFilePartAsync(filePart: FilePart, onUploadProgress: (ev: any) => void): Promise<string> {
        const { partNumber, uploadOffset, uploadLength, file, fileName, fileSize } = filePart;

        console.log(filePart);

        return this.client.updateUpload(
            `/upload/file/${fileName}`,
            new UpdateUploadHeaders(
                fileName,
                partNumber,
                uploadOffset,
                uploadLength,
                fileSize,
                'placeholder'
            ),
            file,
            onUploadProgress
        ).then(() => 'done');
    }
    
    public computeProgress(loaded: number, fileSize: number): number {
        return Math.floor((loaded / fileSize) * 100);
    }

    public computeElapsedTime(unit: unitOfTime.Base, startTime: Date): number {
        return moment().diff(startTime, unit) || 1;
    }
}