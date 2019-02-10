import { Upload } from "./upload-service";
import * as mocks from "../test-helpers/mocks";
import { Client } from "../http";

jest.mock('../http');

describe('uploadFilePartAsync', () => {
    it('uploads a file part', async () => {
        const mockFilePart = mocks.mockFilePart();
        const testBaseUri = 'http://notarealdomain.com';
        const uploadService = new Upload(
            new (jest.fn<Client>(
                baseUri => ({
                    updateUpload: () => {
                        if (baseUri == testBaseUri) {
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