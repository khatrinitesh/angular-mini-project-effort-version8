import { ElementRef } from '@angular/core';
import { AlignStrategy, OffsetPosition } from '@progress/kendo-popup-common';
/**
 * @hidden
 */
export interface AlignElementSettings {
    anchor?: ElementRef;
    anchorAlign: AlignStrategy;
    element: ElementRef;
    elementAlign: AlignStrategy;
    offset?: OffsetPosition;
}
