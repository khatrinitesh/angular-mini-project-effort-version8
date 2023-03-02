import { withRoot } from 'e2e-utils';
import position from '../src/position';

describe('position method', withRoot(root => {
    it('should return bounding rect of element', () => {
        root.append("<style>.root { width: 100px; height: 80px; }</style>");
        root.addClass("root");

        const clientRect = root[0].getBoundingClientRect();
        const rect = position(root[0]);

        expect(rect.width).toBe(100);
        expect(rect.height).toBe(80);
        expect(rect.left).toBe(clientRect.left);
        expect(rect.top).toBe(clientRect.top);
    });

    it('should deduct offset parent rect', () => {
        root.append("<style>.root { position: absolute; top: 100px; left: 100px; border: 2px solid; }</style>");
        root.append("<style>.child { width: 100px; height: 80px; }</style>");

        root.append('<div class="child">CHILD</div>');

        const child = root.children('.child')[0];

        const clientRect = root[0].getBoundingClientRect();
        const rect = position(child);

        expect(rect.width).toBe(100);
        expect(rect.height).toBe(80);
        expect(rect.left).toBe(0);
        expect(rect.top).toBe(0);
    });

    it('should deduct offset parent margin', () => {
        root.append("<style>.root { position: absolute; top: 100px; left: 100px; }</style>");
        root.append("<style>.child { width: 100px; height: 80px; margin: 2px; }</style>");

        root.append('<div class="child">CHILD</div>');

        const child = root.children('.child')[0];

        const clientRect = root[0].getBoundingClientRect();
        const rect = position(child);

        expect(rect.width).toBe(100);
        expect(rect.height).toBe(80);
        expect(rect.left).toBe(0);
        expect(rect.top).toBe(0);
    });
}));
