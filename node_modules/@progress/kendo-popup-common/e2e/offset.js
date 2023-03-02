import { $, withRoot } from 'e2e-utils';
import getWindow from '../src/window';
import offset from '../src/offset';

describe('offset method', withRoot(root => {
    it('should return bounding rect of element', () => {
        root.append("<style>.root { width: 100px; height: 80px; }</style>");
        root.addClass("root");

        const clientRect = root[0].getBoundingClientRect();
        const rect = offset(root[0]);

        expect(rect.width).toBe(100);
        expect(rect.height).toBe(80);
        expect(rect.left).toBe(clientRect.left);
        expect(rect.top).toBe(clientRect.top);
    });

    it('should return bounding rect without window scroll position', () => {
        root.append("<style>body { height: 2000px } .root { position: absolute; top: 100px, width: 100px; height: 80px; }</style>");
        root.addClass("root");

        const scrollY = 200;
        const wnd = getWindow(root[0]);
        wnd.scroll(0, scrollY);

        const rect = offset(root[0]);

        expect(rect.top).toBe(-192);
    });

    it('should return bounding rect applying document client top', () => {
        root.append("<style>html { border-top: 20px solid; } .root { width: 100px; height: 80px; }</style>");
        root.addClass("root");

        const clientRect = root[0].getBoundingClientRect();
        const rect = offset(root[0]);

        expect(rect.top).toBe(clientRect.top);
    });

    it('should honour positioned with className element', () => {
        root.append("<style>.root { position: absolute; top: 200px; }</style>");
        root.addClass("root");

        const clientRect = root[0].getBoundingClientRect();
        const rect = offset(root[0]);

        expect(rect.top).toBe(clientRect.top);
    });

    it('should honour positioned with styles.top/left element', () => {
        root.css("position", "absolute");
        root.css("top", 200);

        const clientRect = root[0].getBoundingClientRect();
        const rect = offset(root[0]);

        expect(rect.top).toBe(clientRect.top);
    });
}));
