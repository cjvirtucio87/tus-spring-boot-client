import { Upload } from "./upload-service";
import * as mocks from "../test-helpers/mocks";
import { Client } from "../http";
import axios from "axios";

jest.mock('axios');

describe('uploadFilePartAsync', () => {
    it('uploads a file part', async () => {
        const mockFilePart = mocks.mockFilePart({partSize: 1, uploadOffset: 0, uploadLength: 1, fileSize: 1});
        const baseUri = 'http://notarealdomain.com'; 

        const mockPatch = jest.spyOn(axios, 'patch');

        mockPatch.mockImplementation(() => Promise.resolve({}));

        const uploadService = new Upload(new Client(baseUri, axios));

        expect(await uploadService.uploadFilePartAsync(mockFilePart, () => {})).toEqual('done');

        expect(mockPatch.mock.calls.length).toEqual(1);
    });
})