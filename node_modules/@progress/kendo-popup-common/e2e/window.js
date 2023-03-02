import { withRoot } from 'e2e-utils';
import getWindow from '../src/window';

describe('getWindow', withRoot(root => {
    it('should return element window', () => {
        expect(getWindow(root[0])).toBe(window);
    });
}));

