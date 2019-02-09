import { Upload } from "./upload-service";
import * as mocks from "../test-helpers/mocks";
import { Client } from "../http";
import MockAdapter from 'axios-mock-adapter';

describe('uploadFilePartAsync', () => {
    it('uploads a file part', async () => {
        const mockFilePart = mocks.mockFilePart({partSize: 1, uploadOffset: 0, uploadLength: 1, fileSize: 1});
        const baseUri = 'http://notarealdomain.com'; 
        const endpoint = `/upload/file/${mockFilePart.fileName}`;
        const mockAxiosInstance = mocks.mockInstance();
        const mockAxiosAdapter = new MockAdapter(mockAxiosInstance); 

        mockAxiosAdapter.onPatch(
            `${baseUri}${endpoint}`,
            mockFilePart.file
        ).reply(200);

        const uploadService = new Upload(new Client(baseUri, mockAxiosInstance));

        expect(await uploadService.uploadFilePartAsync(mockFilePart, () => {})).toEqual('done');
    });
})