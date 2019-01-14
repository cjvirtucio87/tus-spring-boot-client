import * as actions from '../actions';
import * as mocks from '../test-helpers/mocks';

describe('action creators', () => {
    it('should create an action for adding a file', () => {
        const fileParts = [
            mocks.mockFilePart(),
            mocks.mockFilePart(),
            mocks.mockFilePart()
        ];

        expect(
            actions.addFile(fileParts)
        ).toEqual({
            type: 'ADD_FILE',
            parts: fileParts
        });
    });

    it('should create an action for uploading a part', () => {
        const filePart = mocks.mockFilePart();

        expect(
            actions.uploadPart(filePart)
        ).toEqual({
            type: 'UPLOAD_PART',
            part: filePart
        });
    });

    it('should create an action for updating upload progress for a file part', () => {
        const progressData = mocks.mockProgressData();

        expect(
            actions.updateProgress(progressData)
        ).toEqual({
            type: 'UPDATE_PROGRESS',
            progressData
        });
    });

    it('should create an action for finishing an upload', () => {
        expect(
            actions.finishUpload()
        ).toEqual({
            type: 'UPLOAD_DONE'
        });
    });

    it('should create an action for toggling chunk mode', () => {
        expect(
            actions.toggleChunkMode()
        ).toEqual({
            type: 'TOGGLE_CHUNK_MODE'
        });
    });

    it('should create an action for setting the file metadata', () => {
        const fileMetadata = mocks.mockFilemetadata();

        expect(
            actions.setFileMetadata(fileMetadata)
        ).toEqual({
            type: 'SHOW_FILEMETADATA',
            fileMetadata: fileMetadata
        });
    })
});