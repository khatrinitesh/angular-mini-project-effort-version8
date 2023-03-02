"use strict";
var core_1 = require('@angular/core');
var kendo_popup_common_1 = require('@progress/kendo-popup-common');
var util_1 = require('../util');
/**
 * @hidden
 */
var DOMService = (function () {
    function DOMService() {
    }
    DOMService.prototype.addOffset = function (current, addition) {
        return {
            left: current.left + addition.left,
            top: current.top + addition.top
        };
    };
    DOMService.prototype.align = function (settings) {
        return kendo_popup_common_1.align(settings);
    };
    DOMService.prototype.boundingOffset = function (el) {
        return kendo_popup_common_1.boundingOffset(this.nativeElement(el));
    };
    DOMService.prototype.getWindow = function () {
        return util_1.isWindowAvailable() ? window : null;
    };
    DOMService.prototype.isBodyOffset = function (el) {
        return kendo_popup_common_1.isBodyOffset(this.nativeElement(el));
    };
    DOMService.prototype.offset = function (el) {
        if (!el) {
            return null;
        }
        return kendo_popup_common_1.offset(this.nativeElement(el));
    };
    DOMService.prototype.staticOffset = function (el) {
        if (!el) {
            return null;
        }
        var element = this.nativeElement(el);
        var _a = element.style, left = _a.left, top = _a.top;
        element.style.left = '0px';
        element.style.top = '0px';
        var currentOffset = kendo_popup_common_1.offset(element);
        element.style.left = left;
        element.style.top = top;
        return currentOffset;
    };
    DOMService.prototype.nativeElement = function (el) {
        if (!el) {
            return null;
        }
        return el.nativeElement || el;
    };
    DOMService.prototype.position = function (el) {
        if (!el) {
            return null;
        }
        return kendo_popup_common_1.position(this.nativeElement(el));
    };
    DOMService.prototype.relativeOffset = function (el, currentLocation) {
        return kendo_popup_common_1.applyLocationOffset(this.offset(el), currentLocation, this.isBodyOffset(el));
    };
    DOMService.prototype.removeScroll = function (rect, scroll) {
        return kendo_popup_common_1.removeScroll(rect, scroll);
    };
    DOMService.prototype.restrictToView = function (settings) {
        return kendo_popup_common_1.restrictToView(settings);
    };
    DOMService.prototype.scrollPosition = function (el) {
        return kendo_popup_common_1.scrollPosition(this.nativeElement(el));
    };
    DOMService.prototype.scrollableParents = function (el) {
        return util_1.scrollableParents(this.nativeElement(el));
    };
    DOMService.prototype.stackingElementOffset = function (el) {
        var relativeContextElement = this.getRelativeContextElement(el);
        return relativeContextElement ? kendo_popup_common_1.offset(relativeContextElement) : null;
    };
    DOMService.prototype.getRelativeContextElement = function (el) {
        if (!el || !util_1.HAS_RELATIVE_STACKING_CONTEXT) {
            return null;
        }
        var parent = this.nativeElement(el).parentElement;
        while (parent) {
            if (window.getComputedStyle(parent).transform !== 'none') {
                return parent;
            }
            parent = parent.parentElement;
        }
        return null;
    };
    DOMService.prototype.useRelativePosition = function (el) {
        return !!this.getRelativeContextElement(el);
    };
    DOMService.prototype.windowViewPort = function (el) {
        return kendo_popup_common_1.getWindowViewPort(this.nativeElement(el));
    };
    DOMService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    DOMService.ctorParameters = function () { return []; };
    return DOMService;
}());
exports.DOMService = DOMService;
