import { withRoot } from 'e2e-utils';
import isBodyOffset from '../src/is-body-offset';

describe('isBodyOffset', withRoot(root => {
    it('should return true when body is the offset element', () => {
        expect(isBodyOffset(root[0])).toBe(true);
    });

    it('should return false when body is not the offset element', () => {
        root.append("<div>DIV</div>");

        root.css("position", "relative");

        const child = root.children()[0];

        expect(isBodyOffset(child)).toBe(false);
    });
}));

