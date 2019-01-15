import * as reducers from '../reducers';
import * as mocks from '../test-helpers/mocks';
import { State } from '../data/state';

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
    
});