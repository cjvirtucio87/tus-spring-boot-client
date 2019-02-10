import { Upload } from "./upload-service";
import * as mocks from "../test-helpers/mocks";
import { Client } from "../http";
import { UpdateUploadHeaders } from "../data/update-upload-headers";

jest.mock('../http');


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
            new (jest.fn<Client>(
                (baseUri: string) => ({
                    updateUpload: (endpoint: string, updateUploadHeaders: UpdateUploadHeaders) => {
                        if (validateUpdateUpload(`${baseUri}${endpoint}`, updateUploadHeaders)) {
                            return Promise.resolve()
                        }

                        return Promise.reject();
                    }
                })
            ))(testBaseUri)
        );

        expect(await uploadService.uploadFilePartAsync(mockFilePart, () => {})).toEqual('done');
    });
})