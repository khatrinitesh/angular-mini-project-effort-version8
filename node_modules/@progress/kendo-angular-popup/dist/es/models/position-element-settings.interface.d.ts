import { ElementRef } from '@angular/core';
import { AlignStrategy, CollisionStrategy, OffsetPosition, ViewPort } from '@progress/kendo-popup-common';
/**
 * @hidden
 */
export interface PositionElementSettings {
    anchor?: ElementRef;
    anchorAlign: AlignStrategy;
    collisions: CollisionStrategy;
    currentLocation: OffsetPosition;
    element: ElementRef;
    elementAlign: AlignStrategy;
    viewPort?: ViewPort;
}
