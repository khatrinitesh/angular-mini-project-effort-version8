"use strict";
var core_1 = require('@angular/core');
var align_service_1 = require('./services/align.service');
var dom_service_1 = require('./services/dom.service');
var position_service_1 = require('./services/position.service');
var resize_service_1 = require('./services/resize.service');
var scrollable_service_1 = require('./services/scrollable.service');
var util_1 = require('./util');
var DEFAULT_OFFSET = { left: 0, top: 0 };
/**
 * Represents the Kendo UI Popup component for Angular.
 *
 * @example
 * ```ts
 * @@Component({
 * selector: 'my-app',
 * template: `
 *  <button #anchor (click)="show=!show">Toggle</button>
 *  <kendo-popup *ngIf="show" [anchor]="anchor">
 *      <strong>Popup content!</strong>
 *  </kendo-popup>
 * `
 * })
 * class AppComponent {
 *   public show: boolean = false;
 * }
 * ```
 */
var PopupComponent = (function () {
    function PopupComponent(_alignService, container, _cdr, _positionService, _resizeService, _scrollableService, _renderer) {
        this._alignService = _alignService;
        this.container = container;
        this._cdr = _cdr;
        this._positionService = _positionService;
        this._resizeService = _resizeService;
        this._scrollableService = _scrollableService;
        this._renderer = _renderer;
        /**
         * Controls the Popup animation. By default, the open and close animations are enabled.
         *
         * For more information, refer to the section on
         * [animation control]({% slug overview_popup_kendouiforangular %}#toc-enable-and-disable-animations).
         */
        this.animate = true;
        /**
         * Specifies the anchor pivot point.
         *
         * For more information, refer to the section on
         * [positioning]({% slug overview_popup_kendouiforangular %}#toc-set-the-position).
         */
        this.anchorAlign = { horizontal: 'left', vertical: 'bottom' };
        /**
         * Configures the collision behavior of the Popup.
         *
         * For more information, refer to the section on
         * [collisions]({% slug overview_popup_kendouiforangular %}#toc-set-behavior-when-outside-the-viewport).
         */
        this.collision = { horizontal: 'fit', vertical: 'flip' };
        /**
         * Specifies the pivot point of the Popup.
         *
         * For more information, refer to the section on
         * [positioning]({% slug overview_popup_kendouiforangular %}#toc-set-the-position).
         */
        this.popupAlign = { horizontal: 'left', vertical: 'top' };
        /**
         * Specifies the absolute position of the element. The Popup opens next to that point.
         *
         * The Popup pivot point is defined by the `popupAlign` configuration option.
         * The boundary detection is applied by using the window viewport.
         *
         * For more information, refer to the section on
         * [static alignment]({% slug overview_popup_kendouiforangular %}#toc-align-to-specific-static-points).
         */
        this.offset = DEFAULT_OFFSET;
        /**
         * Fires when the anchor is scrolled outside the screen boundaries.
         *
         * For more information, refer to the section on
         * [scrolling outside the viewport]({% slug overview_popup_kendouiforangular %}#toc-set-behavior-when-outside-the-viewport).
         */
        this.anchorViewportLeave = new core_1.EventEmitter();
        /**
         * Fires after the component is closed.
         */
        this.close = new core_1.EventEmitter();
        /**
         * Fires after the component is opened and the open animation has ended.
         */
        this.open = new core_1.EventEmitter();
        /**
         * @hidden
         */
        this.direction = 'down';
        this.currentOffset = DEFAULT_OFFSET;
        this.resolvedPromised = Promise.resolve(null);
        this._renderer.setElementClass(container.nativeElement, 'k-animation-container', true);
        this._renderer.setElementClass(container.nativeElement, 'k-animation-container-fixed', true);
    }
    Object.defineProperty(PopupComponent.prototype, "offsetLeft", {
        /**
         * @hidden
         */
        get: function () {
            return this.currentOffset.left;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PopupComponent.prototype, "offsetTop", {
        /**
         * @hidden
         */
        get: function () {
            return this.currentOffset.top;
        },
        enumerable: true,
        configurable: true
    });
    PopupComponent.prototype.ngOnInit = function () {
        var repositionCallback = this.reposition.bind(this);
        this._resizeService.subscribe(repositionCallback);
        this._scrollableService.forElement(this.anchor || this.container).subscribe(this.onScroll.bind(this));
    };
    PopupComponent.prototype.ngAfterViewChecked = function () {
        var _this = this;
        if (!util_1.isDocumentAvailable()) {
            return;
        }
        var _a = this.position(), flipped = _a.flipped, offset = _a.offset;
        var newDirection = this.getDirection(flipped);
        if (this.direction === newDirection && !util_1.isDifferentOffset(this.currentOffset, offset)) {
            return;
        }
        this.resolvedPromised.then(function () {
            _this.currentOffset = offset;
            _this.direction = newDirection;
            _this._cdr.markForCheck();
        });
    };
    PopupComponent.prototype.ngOnDestroy = function () {
        this.close.emit();
        this._resizeService.unsubscribe();
        this._scrollableService.unsubscribe();
    };
    /**
     * @hidden
     */
    PopupComponent.prototype.triggerOpen = function () {
        this._renderer.setElementClass(this.container.nativeElement, 'k-animation-container-shown', true);
        this.open.emit();
    };
    PopupComponent.prototype.reposition = function () {
        if (!util_1.isDocumentAvailable()) {
            return;
        }
        var _a = this.position(), flipped = _a.flipped, offset = _a.offset;
        this.direction = this.getDirection(flipped);
        this.currentOffset = offset;
    };
    PopupComponent.prototype.position = function () {
        var alignedOffset = this._alignService.alignElement({
            anchor: this.anchor,
            anchorAlign: this.anchorAlign,
            element: this.container,
            elementAlign: this.popupAlign,
            offset: this.offset
        });
        return this._positionService.positionElement({
            anchor: this.anchor,
            anchorAlign: this.anchorAlign,
            collisions: this.collision,
            currentLocation: alignedOffset,
            element: this.container,
            elementAlign: this.popupAlign
        });
    };
    PopupComponent.prototype.getDirection = function (flipped) {
        return this.animate ? (flipped ? 'up' : 'down') : 'none';
    };
    PopupComponent.prototype.onScroll = function (isInViewPort) {
        if (isInViewPort) {
            this.reposition();
        }
        else {
            this.anchorViewportLeave.emit();
        }
    };
    PopupComponent.decorators = [
        { type: core_1.Component, args: [{
                    animations: [
                        core_1.trigger('toggle', [
                            core_1.transition('void => down, up => down', [
                                core_1.style({ transform: 'translateY(-100%)' }),
                                core_1.animate('0.1s ease-in', core_1.style({ transform: 'translateY(0)' }))
                            ]),
                            core_1.transition('down => void', [
                                core_1.style({ transform: 'translateY(0)' }),
                                core_1.animate('0.1s ease-in', core_1.style({ transform: 'translateY(-100%)' }))
                            ]),
                            core_1.transition('void => up, down => up', [
                                core_1.style({ transform: 'translateY(100%)' }),
                                core_1.animate('0.1s ease-in', core_1.style({ transform: 'translateY(0)' }))
                            ]),
                            core_1.transition('up => void', [
                                core_1.style({ transform: 'translateY(0)' }),
                                core_1.animate('0.1s ease-in', core_1.style({ transform: 'translateY(100%)' }))
                            ])
                        ])
                    ],
                    exportAs: 'kendo-popup',
                    providers: [align_service_1.AlignService, dom_service_1.DOMService, position_service_1.PositionService, resize_service_1.ResizeService, scrollable_service_1.ScrollableService],
                    selector: 'kendo-popup',
                    template: "\n        <div class=\"k-popup\" [ngClass]=\"popupClass\" [@toggle]=\"direction\" (@toggle.done)=\"triggerOpen()\">\n            <ng-content></ng-content>\n        </div>\n     "
                },] },
    ];
    /** @nocollapse */
    PopupComponent.ctorParameters = function () { return [
        { type: align_service_1.AlignService, },
        { type: core_1.ElementRef, },
        { type: core_1.ChangeDetectorRef, },
        { type: position_service_1.PositionService, },
        { type: resize_service_1.ResizeService, },
        { type: scrollable_service_1.ScrollableService, },
        { type: core_1.Renderer, },
    ]; };
    PopupComponent.propDecorators = {
        'animate': [{ type: core_1.Input },],
        'anchor': [{ type: core_1.Input },],
        'anchorAlign': [{ type: core_1.Input },],
        'collision': [{ type: core_1.Input },],
        'popupAlign': [{ type: core_1.Input },],
        'popupClass': [{ type: core_1.Input },],
        'offset': [{ type: core_1.Input },],
        'anchorViewportLeave': [{ type: core_1.Output },],
        'close': [{ type: core_1.Output },],
        'open': [{ type: core_1.Output },],
        'offsetLeft': [{ type: core_1.HostBinding, args: ['style.left.px',] },],
        'offsetTop': [{ type: core_1.HostBinding, args: ['style.top.px',] },],
    };
    return PopupComponent;
}());
exports.PopupComponent = PopupComponent;
