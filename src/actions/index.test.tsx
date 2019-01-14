import * as actions from '../../src/actions';
import { FilePart } from '../../src/data/file-part';
import { ProgressData } from '../data/progress-data';
import { FileMetadata } from '../data/file-metadata';

const mockFilemetadata = (args: any = {}) =>
    new FileMetadata(
        'mockFile',
        'pdf',
        '.pdf'
    );

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

const mockProgressData = (args: any = {}) =>
    new ProgressData(
        0,
        0,
        0
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

    it('should create an action for updating upload progress for a file part', () => {
        const progressData = mockProgressData();

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
        const fileMetadata = mockFilemetadata();

        expect(
            actions.setFileMetadata(fileMetadata)
        ).toEqual({
            type: 'SHOW_FILEMETADATA',
            fileMetadata: fileMetadata
        });
    })
});