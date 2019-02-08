import Axios, { AxiosAdapter, AxiosRequestConfig, AxiosResponse } from "axios";
import { UpdateUploadHeaders } from "../data/update-upload-headers";

/**
 * Client for making calls over the network.
 */
export class Client {
    private baseUri: string;
    private client: AxiosAdapter;

    /**
     * Initializes an instance of {@link http.Client}.
     * @param The base URI that calls will be made to.
     * @param client The axios.AxiosAdapter for making calls over the network.
     */
    constructor(baseUri: string, client: AxiosAdapter) {
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
        
        console.log(updateUploadHeaders);

        Axios.interceptors.request.use(request => {
            console.log(request);
            
            return request;
        });
        
        return this.client({
            method: 'patch',
            url: `${this.baseUri}${endpoint}`,
            headers: updateUploadHeaders,
            data: data,
            onUploadProgress
        });
    }
}