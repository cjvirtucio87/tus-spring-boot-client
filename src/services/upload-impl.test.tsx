import { Upload } from "./upload-impl";
import * as mocks from "../test-helpers/mocks";
import { UpdateUploadHeaders } from "../data/update-upload-headers";
import Axios, { AxiosInstance, AxiosResponse } from "axios";
import { BasicClient } from "../http/basic";
import moment, { unitOfTime } from 'moment';

jest.mock('../http/api');


describe('uploadFilePartAsync', () => {
    it('uploads a file part', async () => {
        const mockFilePart = mocks.mockFilePart();
        const testBaseUri = 'http://notarealdomain.com';

        const validateUpdateUpload = (url: string, updateUploadHeaders: UpdateUploadHeaders) => 
            url == `${testBaseUri}/upload/file/${mockFilePart.fileName}`
            && updateUploadHeaders.fileName == mockFilePart.fileName
            && updateUploadHeaders.fileSize == mockFilePart.fileSize
            && updateUploadHeaders.partNumber == mockFilePart.partNumber
            && updateUploadHeaders.uploadLength == mockFilePart.uploadLength
            && updateUploadHeaders.uploadOffset == mockFilePart.uploadOffset;

        const uploadService = new Upload(
            new (jest.fn(
                (baseUri: string, client: AxiosInstance) => ({
                    updateUpload(
                        endpoint: string, 
                        updateUploadHeaders: UpdateUploadHeaders, 
                        data: any, 
                        onUploadProgress: (ev: any) => void): Promise<AxiosResponse> {
                            if (validateUpdateUpload(`${baseUri}${endpoint}`, updateUploadHeaders)) {
                                return Promise.resolve<AxiosResponse<any>>({
                                    data: {},
                                    status: 200,
                                    statusText: 'OK',
                                    headers: {},
                                    config: {}
                                });
                            }

                            return Promise.reject();
                    }
                })
            ))(testBaseUri, Axios.create())
        );

        expect(await uploadService.uploadFilePartAsync(mockFilePart, () => {})).toEqual('done');
    });
});

describe('computeProgress', () => {
    it('computes the progress of an upload', () => {
        const uploadService = new Upload(new BasicClient('localhost', Axios));

        expect(uploadService.computeProgress(200, 1000)).toEqual(20);
    });
});

describe('computeElapsedTime', () => {
    it('computes the time elapsed since the given start time', () => {
        const uploadService = new Upload(new BasicClient('localhost', Axios));
        const endTime = moment([2004, 7, 4]);
        const startTime = moment([2004, 7, 1]);

        expect(uploadService.computeElapsedTime('days', startTime.toDate(), endTime.toDate())).toEqual(3);
    })
})