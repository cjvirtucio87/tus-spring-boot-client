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
        const expectedAction = {
            type: 'ADD_FILE',
            parts: fileParts
        };

        expect(actions.addFile(fileParts)).toEqual(expectedAction);
    });
});