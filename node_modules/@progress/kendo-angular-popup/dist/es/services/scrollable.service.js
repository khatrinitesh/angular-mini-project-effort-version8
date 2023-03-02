import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/auditTime';
import { DOMService } from './dom.service';
import { FRAME_DURATION, isDocumentAvailable } from '../util';
/**
 * @hidden
 */
export var ScrollableService = (function () {
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
        if (!callback || !isDocumentAvailable() || !this.element) {
            return;
        }
        var nativeElement = this._dom.nativeElement(this.element);
        var parents = this._dom.scrollableParents(this.element);
        this._zone.runOutsideAngular(function () {
            var observables = parents.map(function (p) { return Observable.fromEvent(p, "scroll").auditTime(FRAME_DURATION); });
            var subscriber = function (e) { return (_this._zone.run(function () { return (callback(_this.isVisible(nativeElement, e.target))); })); };
            _this.subscription = Observable.merge.apply(Observable, observables).subscribe(subscriber);
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
        { type: Injectable },
    ];
    /** @nocollapse */
    ScrollableService.ctorParameters = function () { return [
        { type: DOMService, },
        { type: NgZone, },
    ]; };
    return ScrollableService;
}());
