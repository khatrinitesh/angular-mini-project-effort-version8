import { withRoot } from 'e2e-utils';
import getDocument from '../src/document';

describe('getDocument', withRoot(root => {
    it('should return element document', () => {
        expect(getDocument(root[0])).toBe(document.documentElement);
    });
}));

