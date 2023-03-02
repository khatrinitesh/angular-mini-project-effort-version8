import { withRoot } from 'e2e-utils';
import scroll from '../src/scroll-position';

import docElement from '../src/document';
import getWindow from '../src/window';

describe('scroll method', withRoot(root => {
    it('should return window scroll position', () => {
        root.append("<style>body { height: 2000px; width: 4000px; }</style>");

        const scrollX = 400;
        const scrollY = 200;
        const wnd = getWindow(root[0]);

        wnd.scroll(scrollX, scrollY);

        const scrollPosition = scroll(root[0]);

        expect(scrollPosition.x, scrollX);
        expect(scrollPosition.y, scrollY);
    });
}));
