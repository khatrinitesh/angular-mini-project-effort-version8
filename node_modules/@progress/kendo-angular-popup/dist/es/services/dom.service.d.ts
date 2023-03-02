import { ElementRef } from '@angular/core';
import { AlignSettings, BoundingRect, ElementRect, OffsetPosition, PositionSettings, ScrollInfo, ViewPort } from '@progress/kendo-popup-common';
import { Position } from '../models/position.interface';
/**
 * @hidden
 */
export declare class DOMService {
    addOffset(current: OffsetPosition, addition: OffsetPosition): OffsetPosition;
    align(settings: AlignSettings): OffsetPosition;
    boundingOffset(el: ElementRef): BoundingRect;
    getWindow(): Window;
    isBodyOffset(el: ElementRef): boolean;
    offset(el: ElementRef): ElementRect;
    staticOffset(el: ElementRef): ElementRect;
    nativeElement(el: ElementRef): HTMLElement;
    position(el: ElementRef): ElementRect;
    relativeOffset(el: ElementRef, currentLocation: OffsetPosition): ElementRect;
    removeScroll(rect: ElementRect, scroll: ScrollInfo): ElementRect;
    restrictToView(settings: PositionSettings): Position;
    scrollPosition(el: ElementRef): ScrollInfo;
    scrollableParents(el: ElementRef): Array<HTMLElement>;
    stackingElementOffset(el: ElementRef): ElementRect;
    getRelativeContextElement(el: ElementRef): HTMLElement;
    useRelativePosition(el: ElementRef): boolean;
    windowViewPort(el: ElementRef): ViewPort;
}
