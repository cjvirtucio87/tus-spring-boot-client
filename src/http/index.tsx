import { AxiosResponse, AxiosInstance } from "axios";
import { UpdateUploadHeaders } from "../data/update-upload-headers";

/**
 * Client for making calls over the network.
 */
export class Client {
    private baseUri: string;
    private client: AxiosInstance;

    /**
     * Initializes an instance of {@link http.Client}.
     * @param The base URI that calls will be made to.
     * @param client The axios.AxiosAdapter for making calls over the network.
     */
    constructor(baseUri: string, client: AxiosInstance) {
        this.baseUri = baseUri;
        this.client = client;
    }

    /**
     * Update an existing upload.
     * @param endpoint The endpoint that the request will be made to.
     * @param updateUploadHeaders The headers for the request.
     * @param data The content of the request body.
     * @param onUploadProgress The handler for an event while the upload is in progress.
     */
    public updateUpload (
        endpoint: string, 
        updateUploadHeaders: UpdateUploadHeaders, 
        data: any = {}, 
        onUploadProgress: (ev: any) => void): Promise<AxiosResponse> {
        
        return this.client.patch(
            `${this.baseUri}${endpoint}`,
            data,
            {
                onUploadProgress,
                headers: updateUploadHeaders
            }
        );
    }
}