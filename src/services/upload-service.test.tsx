import { Upload } from "./upload-service";
import * as mocks from "../test-helpers/mocks";
import axios from "axios";
import { Client } from "../http";

describe('uploadFilePartAsync', () => {
    it('uploads a file part', async () => {
        const mockFilePart = mocks.mockFilePart({partSize: 1, uploadOffset: 0, uploadLength: 1, fileSize: 1});
        const baseUri = 'http://notarealdomain.com'; 
        const endpoint = `/upload/file/${mockFilePart.fileName}`;
        const mockClient = mocks.mockClient();
        mockClient.onPatch(
            `${baseUri}${endpoint}` 
        ).reply(200);

        const uploadService = new Upload(new Client(baseUri, axios));

        expect(await uploadService.uploadFilePartAsync(mockFilePart, () => {})).toEqual('done');
    });
})