import { ElementRef } from '@angular/core';
import { AlignStrategy, CollisionStrategy, MarginSettings, OffsetPosition, ViewPort } from '@progress/kendo-popup-common';
import { PositionMode } from './position-mode';
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
    margin: MarginSettings;
    positionMode?: PositionMode;
    viewPort?: ViewPort;
}
