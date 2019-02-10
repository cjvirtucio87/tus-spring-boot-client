import { Upload } from "./upload-service";
import * as mocks from "../test-helpers/mocks";
import { Client } from "../http";
import axios from "axios";

jest.mock('axios');

describe('uploadFilePartAsync', () => {
    it('uploads a file part', async () => {
        const mockFilePart = mocks.mockFilePart();
        const baseUri = 'http://notarealdomain.com'; 

        const mockPatch = jest.spyOn(axios, 'patch');

        mockPatch.mockImplementation((url, body, config) => {
            if (url === `${baseUri}/upload/file/${mockFilePart.fileName}`) {
                return Promise.resolve();
            }

            return Promise.reject();
        });

        const uploadService = new Upload(new Client(baseUri, axios));

        expect(await uploadService.uploadFilePartAsync(mockFilePart, () => {})).toEqual('done');

        expect(mockPatch.mock.calls.length).toEqual(1);
    });
})