import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/auditTime';
import { FRAME_DURATION, isDocumentAvailable } from '../util';
import { DOMService } from './dom.service';
/**
 * @hidden
 */
export var ResizeService = (function () {
    function ResizeService(_dom, _zone) {
        this._dom = _dom;
        this._zone = _zone;
    }
    ResizeService.prototype.subscribe = function (callback) {
        var _this = this;
        if (!isDocumentAvailable()) {
            return;
        }
        this._zone.runOutsideAngular(function () {
            _this.subscription = Observable
                .fromEvent(_this._dom.getWindow(), "resize")
                .auditTime(FRAME_DURATION)
                .subscribe(function () { return _this._zone.run(function () { return callback(); }); });
        });
    };
    ResizeService.prototype.unsubscribe = function () {
        if (!this.subscription) {
            return;
        }
        this.subscription.unsubscribe();
    };
    ResizeService.prototype.isUnsubscribed = function () {
        return this.subscription && this.subscription.closed;
    };
    ResizeService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ResizeService.ctorParameters = function () { return [
        { type: DOMService, },
        { type: NgZone, },
    ]; };
    return ResizeService;
}());
