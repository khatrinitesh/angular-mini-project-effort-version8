import { $, withRoot } from 'e2e-utils';
import offsetParent from '../src/offset-parent';

describe('offsetParent method', withRoot(root => {
    it('should return document body', () => {
        expect(offsetParent(root[0])).toBe(document.body);
    });

    it('should return closest absolute element', () => {
        const content = $(`<div style="position:absolute">
            <div class="middle">
                <div class="bottom">bottom</div>
            </div>
          </div>`).appendTo(root);

        const element = content.find('.bottom');

        expect(offsetParent(element[0])).toBe(content[0]);
    });

    it('should return closest absolute element', () => {
        const content = $(`<div style="position:relative">
            <div class="middle" style="position:static">
                <div class="bottom">bottom</div>
            </div>
          </div>`).appendTo(root);

        const element = content.find('.bottom');

        expect(offsetParent(element[0])).toBe(content[0]);
    });
}));
