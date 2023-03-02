import { EventEmitter } from '@angular/core';
import { NavigationAction } from './navigation-action';
/**
 * @hidden
 */
export declare class NavigationService {
    open: EventEmitter<any>;
    close: EventEmitter<any>;
    enter: EventEmitter<any>;
    tab: EventEmitter<any>;
    esc: EventEmitter<any>;
    up: EventEmitter<any>;
    right: EventEmitter<any>;
    down: EventEmitter<any>;
    left: EventEmitter<any>;
    delete: EventEmitter<any>;
    backspace: EventEmitter<any>;
    home: EventEmitter<any>;
    end: EventEmitter<any>;
    process(args: any): NavigationAction;
    private next(args);
}
