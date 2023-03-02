import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Input, Output, Renderer, trigger, style, transition, animate } from '@angular/core';
import { AlignService } from './services/align.service';
import { DOMService } from './services/dom.service';
import { PositionService } from './services/position.service';
import { ResizeService } from './services/resize.service';
import { ScrollableService } from './services/scrollable.service';
import { isDifferentOffset, isDocumentAvailable } from './util';
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
export var PopupComponent = (function () {
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
        this.anchorViewportLeave = new EventEmitter();
        /**
         * Fires after the component is closed.
         */
        this.close = new EventEmitter();
        /**
         * Fires after the component is opened and the open animation has ended.
         */
        this.open = new EventEmitter();
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
        if (!isDocumentAvailable()) {
            return;
        }
        var _a = this.position(), flipped = _a.flipped, offset = _a.offset;
        var newDirection = this.getDirection(flipped);
        if (this.direction === newDirection && !isDifferentOffset(this.currentOffset, offset)) {
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
        if (!isDocumentAvailable()) {
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
        { type: Component, args: [{
                    animations: [
                        trigger('toggle', [
                            transition('void => down, up => down', [
                                style({ transform: 'translateY(-100%)' }),
                                animate('0.1s ease-in', style({ transform: 'translateY(0)' }))
                            ]),
                            transition('down => void', [
                                style({ transform: 'translateY(0)' }),
                                animate('0.1s ease-in', style({ transform: 'translateY(-100%)' }))
                            ]),
                            transition('void => up, down => up', [
                                style({ transform: 'translateY(100%)' }),
                                animate('0.1s ease-in', style({ transform: 'translateY(0)' }))
                            ]),
                            transition('up => void', [
                                style({ transform: 'translateY(0)' }),
                                animate('0.1s ease-in', style({ transform: 'translateY(100%)' }))
                            ])
                        ])
                    ],
                    exportAs: 'kendo-popup',
                    providers: [AlignService, DOMService, PositionService, ResizeService, ScrollableService],
                    selector: 'kendo-popup',
                    template: "\n        <div class=\"k-popup\" [ngClass]=\"popupClass\" [@toggle]=\"direction\" (@toggle.done)=\"triggerOpen()\">\n            <ng-content></ng-content>\n        </div>\n     "
                },] },
    ];
    /** @nocollapse */
    PopupComponent.ctorParameters = function () { return [
        { type: AlignService, },
        { type: ElementRef, },
        { type: ChangeDetectorRef, },
        { type: PositionService, },
        { type: ResizeService, },
        { type: ScrollableService, },
        { type: Renderer, },
    ]; };
    PopupComponent.propDecorators = {
        'animate': [{ type: Input },],
        'anchor': [{ type: Input },],
        'anchorAlign': [{ type: Input },],
        'collision': [{ type: Input },],
        'popupAlign': [{ type: Input },],
        'popupClass': [{ type: Input },],
        'offset': [{ type: Input },],
        'anchorViewportLeave': [{ type: Output },],
        'close': [{ type: Output },],
        'open': [{ type: Output },],
        'offsetLeft': [{ type: HostBinding, args: ['style.left.px',] },],
        'offsetTop': [{ type: HostBinding, args: ['style.top.px',] },],
    };
    return PopupComponent;
}());
