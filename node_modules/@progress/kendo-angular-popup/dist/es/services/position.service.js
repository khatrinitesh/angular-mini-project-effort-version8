import { Injectable } from '@angular/core';
import { DOMService } from './dom.service';
import { eitherRect, replaceOffset } from '../util';
/**
 * @hidden
 */
export var PositionService = (function () {
    function PositionService(_dom) {
        this._dom = _dom;
    }
    PositionService.prototype.positionElement = function (settings) {
        var anchor = settings.anchor, currentLocation = settings.currentLocation, element = settings.element, anchorAlign = settings.anchorAlign, elementAlign = settings.elementAlign, collisions = settings.collisions;
        var relative = this._dom.useRelativePosition(element);
        var viewPort = settings.viewPort || this._dom.windowViewPort(element);
        var anchorRect = eitherRect(this._dom.offset(anchor), currentLocation);
        var beforeRestrictionOffset = !relative ? currentLocation : null;
        var afterRestrictionOffset = relative ? currentLocation : null;
        var elementRect = replaceOffset(this._dom.staticOffset(element), beforeRestrictionOffset);
        var result = this._dom.restrictToView({
            anchorAlign: anchorAlign,
            anchorRect: anchorRect,
            collisions: collisions,
            elementAlign: elementAlign,
            elementRect: elementRect,
            viewPort: viewPort
        });
        return {
            flipped: result.flipped,
            offset: this._dom.addOffset(replaceOffset(elementRect, afterRestrictionOffset), result.offset)
        };
    };
    PositionService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    PositionService.ctorParameters = function () { return [
        { type: DOMService, },
    ]; };
    return PositionService;
}());
