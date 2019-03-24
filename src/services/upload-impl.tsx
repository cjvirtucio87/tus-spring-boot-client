import { FilePart } from "../data/file-part";
import moment, { unitOfTime } from 'moment';
import { Client } from "../http/api";
import { UpdateUploadHeaders } from "../data/update-upload-headers";
import { UploadService } from "./upload-api";


export class Upload implements UploadService {
    private client: Client;

    /**
     * Initializes an instance of {@link services.Upload}.
     * @param client The {@link http.Client} for making calls over the network.
     */
    constructor(client: Client) {
        this.client = client;
    }

    /** @inheritdoc */
    public uploadFilePartAsync(filePart: FilePart, onUploadProgress: (ev: any) => void): Promise<string> {
        const { partNumber, uploadOffset, uploadLength, file, fileName, fileSize } = filePart;

        return this.client.updateUpload(
            `/upload/file/${fileName}`,
            new UpdateUploadHeaders(
                fileName,
                fileSize,
                partNumber,
                uploadOffset,
                uploadLength,
                'placeholder'
            ),
            file,
            onUploadProgress
        ).then(() => 'done');
    }
    
    /** @inheritdoc */
    public computeProgress(loaded: number, fileSize: number): number {
        return Math.floor((loaded / fileSize) * 100);
    }

    /** @inheritdoc */
    public computeElapsedTime(unit: unitOfTime.Base, startTime: Date, endTime: Date): number {
        return moment(endTime).diff(startTime, unit) || 1;
    }
}