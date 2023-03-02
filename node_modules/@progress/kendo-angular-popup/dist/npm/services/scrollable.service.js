"use strict";
var core_1 = require('@angular/core');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/observable/fromEvent');
require('rxjs/add/observable/merge');
require('rxjs/add/operator/auditTime');
var dom_service_1 = require('./dom.service');
var util_1 = require('../util');
/**
 * @hidden
 */
var ScrollableService = (function () {
    function ScrollableService(_dom, _zone) {
        this._dom = _dom;
        this._zone = _zone;
    }
    ScrollableService.prototype.forElement = function (element) {
        this.unsubscribe();
        this.element = element;
        return this;
    };
    ScrollableService.prototype.subscribe = function (callback) {
        var _this = this;
        if (!callback || !util_1.isDocumentAvailable() || !this.element) {
            return;
        }
        var nativeElement = this._dom.nativeElement(this.element);
        var parents = this._dom.scrollableParents(this.element);
        this._zone.runOutsideAngular(function () {
            var observables = parents.map(function (p) { return Observable_1.Observable.fromEvent(p, "scroll").auditTime(util_1.FRAME_DURATION); });
            var subscriber = function (e) { return (_this._zone.run(function () { return (callback(_this.isVisible(nativeElement, e.target))); })); };
            _this.subscription = Observable_1.Observable.merge.apply(Observable_1.Observable, observables).subscribe(subscriber);
        });
    };
    ScrollableService.prototype.unsubscribe = function () {
        if (!this.subscription) {
            return;
        }
        this.subscription.unsubscribe();
    };
    ScrollableService.prototype.isVisible = function (elem, container) {
        var elemRect = this._dom.boundingOffset(elem);
        var containerRect = this._dom.boundingOffset(container);
        if (elemRect.bottom < containerRect.top) {
            return false;
        }
        if (elemRect.bottom > containerRect.bottom) {
            return false;
        }
        if (elemRect.right > containerRect.right) {
            return false;
        }
        if (elemRect.left < containerRect.left) {
            return false;
        }
        return true;
    };
    ScrollableService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    ScrollableService.ctorParameters = function () { return [
        { type: dom_service_1.DOMService, },
        { type: core_1.NgZone, },
    ]; };
    return ScrollableService;
}());
exports.ScrollableService = ScrollableService;
