import { Injectable } from '@angular/core';
import { align, applyLocationOffset, boundingOffset, getWindowViewPort, isBodyOffset, offset, position, restrictToView, removeScroll, scrollPosition } from '@progress/kendo-popup-common';
import { isWindowAvailable, HAS_RELATIVE_STACKING_CONTEXT, scrollableParents } from '../util';
/**
 * @hidden
 */
export var DOMService = (function () {
    function DOMService() {
    }
    DOMService.prototype.addOffset = function (current, addition) {
        return {
            left: current.left + addition.left,
            top: current.top + addition.top
        };
    };
    DOMService.prototype.align = function (settings) {
        return align(settings);
    };
    DOMService.prototype.boundingOffset = function (el) {
        return boundingOffset(this.nativeElement(el));
    };
    DOMService.prototype.getWindow = function () {
        return isWindowAvailable() ? window : null;
    };
    DOMService.prototype.isBodyOffset = function (el) {
        return isBodyOffset(this.nativeElement(el));
    };
    DOMService.prototype.offset = function (el) {
        if (!el) {
            return null;
        }
        return offset(this.nativeElement(el));
    };
    DOMService.prototype.staticOffset = function (el) {
        if (!el) {
            return null;
        }
        var element = this.nativeElement(el);
        var _a = element.style, left = _a.left, top = _a.top;
        element.style.left = '0px';
        element.style.top = '0px';
        var currentOffset = offset(element);
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
        return position(this.nativeElement(el));
    };
    DOMService.prototype.relativeOffset = function (el, currentLocation) {
        return applyLocationOffset(this.offset(el), currentLocation, this.isBodyOffset(el));
    };
    DOMService.prototype.removeScroll = function (rect, scroll) {
        return removeScroll(rect, scroll);
    };
    DOMService.prototype.restrictToView = function (settings) {
        return restrictToView(settings);
    };
    DOMService.prototype.scrollPosition = function (el) {
        return scrollPosition(this.nativeElement(el));
    };
    DOMService.prototype.scrollableParents = function (el) {
        return scrollableParents(this.nativeElement(el));
    };
    DOMService.prototype.stackingElementOffset = function (el) {
        var relativeContextElement = this.getRelativeContextElement(el);
        return relativeContextElement ? offset(relativeContextElement) : null;
    };
    DOMService.prototype.getRelativeContextElement = function (el) {
        if (!el || !HAS_RELATIVE_STACKING_CONTEXT) {
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
        return getWindowViewPort(this.nativeElement(el));
    };
    DOMService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DOMService.ctorParameters = function () { return []; };
    return DOMService;
}());
