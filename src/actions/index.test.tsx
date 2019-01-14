import * as actions from '../../src/actions';
import { FilePart } from '../../src/data/file-part';

const mockFilePart = (args: any = {}) =>
    new FilePart(
        new Blob(),
        'mockfile',
        'pdf',
        0,
        0,
        args.partSize,
        args.uploadOffset,
        args.uploadLength,
        args.fileSize,
    );

describe('action creators', () => {
    it('should create an action for adding a file', () => {
        const fileParts = [
            mockFilePart(),
            mockFilePart(),
            mockFilePart()
        ];

        expect(
            actions.addFile(fileParts)
        ).toEqual({
            type: 'ADD_FILE',
            parts: fileParts
        });
    });

    it('should create an action for uploading a part', () => {
        const filePart = mockFilePart();

        expect(
            actions.uploadPart(filePart)
        ).toEqual({
            type: 'UPLOAD_PART',
            part: filePart
        });
    });
});