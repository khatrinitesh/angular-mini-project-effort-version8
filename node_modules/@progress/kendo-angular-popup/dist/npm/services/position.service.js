"use strict";
var core_1 = require('@angular/core');
var dom_service_1 = require('./dom.service');
var util_1 = require('../util');
/**
 * @hidden
 */
var PositionService = (function () {
    function PositionService(_dom) {
        this._dom = _dom;
    }
    PositionService.prototype.positionElement = function (settings) {
        var anchor = settings.anchor, currentLocation = settings.currentLocation, element = settings.element, anchorAlign = settings.anchorAlign, elementAlign = settings.elementAlign, collisions = settings.collisions;
        var relative = this._dom.useRelativePosition(element);
        var viewPort = settings.viewPort || this._dom.windowViewPort(element);
        var anchorRect = util_1.eitherRect(this._dom.offset(anchor), currentLocation);
        var beforeRestrictionOffset = !relative ? currentLocation : null;
        var afterRestrictionOffset = relative ? currentLocation : null;
        var elementRect = util_1.replaceOffset(this._dom.staticOffset(element), beforeRestrictionOffset);
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
            offset: this._dom.addOffset(util_1.replaceOffset(elementRect, afterRestrictionOffset), result.offset)
        };
    };
    PositionService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    PositionService.ctorParameters = function () { return [
        { type: dom_service_1.DOMService, },
    ]; };
    return PositionService;
}());
exports.PositionService = PositionService;
