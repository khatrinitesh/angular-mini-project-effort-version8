import { AfterViewChecked, ChangeDetectorRef, ElementRef, EventEmitter, OnInit, OnDestroy, Renderer } from '@angular/core';
import { Align } from './models/align.interface';
import { Collision } from './models/collision.interface';
import { Offset } from './models/offset.interface';
import { AlignService } from './services/align.service';
import { PositionService } from './services/position.service';
import { ResizeService } from './services/resize.service';
import { ScrollableService } from './services/scrollable.service';
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
export declare class PopupComponent implements AfterViewChecked, OnInit, OnDestroy {
    private _alignService;
    private container;
    private _cdr;
    private _positionService;
    private _resizeService;
    private _scrollableService;
    private _renderer;
    /**
     * Controls the Popup animation. By default, the open and close animations are enabled.
     *
     * For more information, refer to the section on
     * [animation control]({% slug overview_popup_kendouiforangular %}#toc-enable-and-disable-animations).
     */
    animate: boolean;
    /**
     * Specifies the element that will be used as an anchor. The Popup opens next to that element.
     *
     * For more information, refer to the section on the
     * [anchor]({% slug overview_popup_kendouiforangular %}#toc-align-to-specific-components).
     */
    anchor: ElementRef;
    /**
     * Specifies the anchor pivot point.
     *
     * For more information, refer to the section on
     * [positioning]({% slug overview_popup_kendouiforangular %}#toc-set-the-position).
     */
    anchorAlign: Align;
    /**
     * Configures the collision behavior of the Popup.
     *
     * For more information, refer to the section on
     * [collisions]({% slug overview_popup_kendouiforangular %}#toc-set-behavior-when-outside-the-viewport).
     */
    collision: Collision;
    /**
     * Specifies the pivot point of the Popup.
     *
     * For more information, refer to the section on
     * [positioning]({% slug overview_popup_kendouiforangular %}#toc-set-the-position).
     */
    popupAlign: Align;
    /**
     * Specifies a list of CSS classes to be added to the internal animated element.
     *
     * > If the content of the Popup needs to be styled, use this property binding.
     *
     * For more information, refer to the section on
     * [appearance control]({% slug overview_popup_kendouiforangular %}#toc-set-the-styles).
     */
    popupClass: string | Array<string> | Object;
    /**
     * Specifies the absolute position of the element. The Popup opens next to that point.
     *
     * The Popup pivot point is defined by the `popupAlign` configuration option.
     * The boundary detection is applied by using the window viewport.
     *
     * For more information, refer to the section on
     * [static alignment]({% slug overview_popup_kendouiforangular %}#toc-align-to-specific-static-points).
     */
    offset: Offset;
    /**
     * Fires when the anchor is scrolled outside the screen boundaries.
     *
     * For more information, refer to the section on
     * [scrolling outside the viewport]({% slug overview_popup_kendouiforangular %}#toc-set-behavior-when-outside-the-viewport).
     */
    anchorViewportLeave: EventEmitter<any>;
    /**
     * Fires after the component is closed.
     */
    close: EventEmitter<any>;
    /**
     * Fires after the component is opened and the open animation has ended.
     */
    open: EventEmitter<any>;
    /**
     * @hidden
     */
    readonly offsetLeft: number;
    /**
     * @hidden
     */
    readonly offsetTop: number;
    /**
     * @hidden
     */
    direction: string;
    private currentOffset;
    private resolvedPromised;
    constructor(_alignService: AlignService, container: ElementRef, _cdr: ChangeDetectorRef, _positionService: PositionService, _resizeService: ResizeService, _scrollableService: ScrollableService, _renderer: Renderer);
    ngOnInit(): void;
    ngAfterViewChecked(): void;
    ngOnDestroy(): void;
    /**
     * @hidden
     */
    triggerOpen(): void;
    private reposition();
    private position();
    private getDirection(flipped);
    private onScroll(isInViewPort);
}
