"use strict";
var core_1 = require('@angular/core');
var dom_service_1 = require('./dom.service');
var util_1 = require('../util');
/**
 * @hidden
 */
var AlignService = (function () {
    function AlignService(_dom) {
        this._dom = _dom;
    }
    AlignService.prototype.alignElement = function (settings) {
        var anchor = settings.anchor, element = settings.element, anchorAlign = settings.anchorAlign, elementAlign = settings.elementAlign, offset = settings.offset;
        var dom = this._dom;
        var elementRect = dom.offset(element);
        var stackingOffset = dom.stackingElementOffset(anchor || element);
        var anchorRect = util_1.eitherRect(dom.offset(anchor), offset);
        anchorRect = util_1.removeStackingOffset(anchorRect, stackingOffset);
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
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    AlignService.ctorParameters = function () { return [
        { type: dom_service_1.DOMService, },
    ]; };
    return AlignService;
}());
exports.AlignService = AlignService;
