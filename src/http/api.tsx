import { UpdateUploadHeaders } from "../data/update-upload-headers";
import { AxiosResponse } from "axios";

export interface Client {
    /**
     * Update an existing upload.
     * @param endpoint The endpoint that the request will be made to.
     * @param updateUploadHeaders The headers for the request.
     * @param data The content of the request body.
     * @param onUploadProgress The handler for an event while the upload is in progress.
     */
    updateUpload (
        endpoint: string, 
        updateUploadHeaders: UpdateUploadHeaders, 
        data: any, 
        onUploadProgress: (ev: any) => void): Promise<AxiosResponse>;
}