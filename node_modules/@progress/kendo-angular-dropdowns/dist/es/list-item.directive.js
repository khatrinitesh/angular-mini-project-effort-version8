import { Directive, ElementRef } from '@angular/core';
/**
 * @hidden
 */
export var ListItemDirective = (function () {
    function ListItemDirective(element) {
        this.element = element;
    }
    ListItemDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'li' // tslint:disable-line
                },] },
    ];
    /** @nocollapse */
    ListItemDirective.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    return ListItemDirective;
}());
