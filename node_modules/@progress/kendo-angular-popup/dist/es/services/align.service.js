import { Injectable } from '@angular/core';
import { DOMService } from './dom.service';
import { eitherRect, removeStackingOffset } from '../util';
/**
 * @hidden
 */
export var AlignService = (function () {
    function AlignService(_dom) {
        this._dom = _dom;
    }
    AlignService.prototype.alignElement = function (settings) {
        var anchor = settings.anchor, element = settings.element, anchorAlign = settings.anchorAlign, elementAlign = settings.elementAlign, offset = settings.offset;
        var dom = this._dom;
        var elementRect = dom.offset(element);
        var stackingOffset = dom.stackingElementOffset(anchor || element);
        var anchorRect = eitherRect(dom.offset(anchor), offset);
        anchorRect = removeStackingOffset(anchorRect, stackingOffset);
        if (!anchor) {
            anchorRect = dom.removeScroll(anchorRect, dom.scrollPosition(element));
        }
        return this._dom.align({
            anchorAlign: anchorAlign,
            anchorRect: anchorRect,
            elementAlign: elementAlign,
            elementRect: elementRect
        });
    };
    AlignService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    AlignService.ctorParameters = function () { return [
        { type: DOMService, },
    ]; };
    return AlignService;
}());
