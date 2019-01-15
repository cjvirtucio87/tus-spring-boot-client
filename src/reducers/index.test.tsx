import * as reducers from '../reducers';
import * as mocks from '../test-helpers/mocks';
import { State } from '../data/state';
import { ProgressDataCollection } from '../data/progress-data-collection';

describe('reducers', () => {
    it('adds a new file to the state', () => {
        const fileParts = [
            mocks.mockFilePart(),
            mocks.mockFilePart(),
            mocks.mockFilePart()
        ];

        const newState = new State(fileParts);

        expect(
            reducers.file(
                new State(),
                {
                    type: 'ADD_FILE',
                    parts: fileParts
                }
            )
        ).toEqual(newState);
    });
    
    it('updates the progress of a file part', () => {
        const progressDataCollection = new ProgressDataCollection();
        const progressData = mocks.mockProgressData()

        progressDataCollection[0] = progressData;

        const newState = new State(undefined, undefined, undefined, undefined, progressDataCollection);

        expect(
            reducers.file(
                new State(),
                {
                    type: 'UPDATE_PROGRESS',
                    progressData: progressData
                }
            )
        ).toEqual(newState);
    });

    it("marks the upload as 'done'", () => {
        const newState = new State(undefined, true, undefined, undefined, undefined);

        expect(
            reducers.file(
                new State(),
                {
                    type: 'UPLOAD_DONE'
                }
            )
        ).toEqual(newState);
    })

    it('toggles chunk mode', () => {
        const firstToggledChunked = reducers.file(
            new State(undefined, undefined, undefined, undefined, undefined),
            {}
        ).chunked;

        expect(firstToggledChunked).toBeTruthy();

        const secondToggledChunked = reducers.file(
            new State(),
            {
                type: 'TOGGLE_CHUNK_MODE',
                chunked: firstToggledChunked
            }
        ).chunked;

        expect(secondToggledChunked).toBeFalsy();
    });

    it('shows the file metadata', () => {
        const fileMetadata = mocks.mockFileMetadata();

        const newState = new State(undefined, undefined, undefined, fileMetadata);

        expect(
            reducers.file(
                new State(),
                {
                    type: 'SHOW_FILEMETADATA',
                    fileMetadata: fileMetadata
                }
            )
        ).toEqual(newState);
    })
});