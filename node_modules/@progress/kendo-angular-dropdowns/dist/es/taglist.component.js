import { Component, Input, Output, EventEmitter } from '@angular/core';
/**
 * @hidden
 */
export var TagListComponent = (function () {
    function TagListComponent() {
        this.removeTag = new EventEmitter();
    }
    TagListComponent.prototype.tagText = function (tag) {
        return tag[this.textField] ? tag[this.textField] : tag;
    };
    TagListComponent.prototype.tagCloseClick = function (event, tag) {
        event.stopImmediatePropagation();
        if (!this.disabled) {
            this.removeTag.emit(tag);
        }
    };
    TagListComponent.prototype.itemId = function (focused, index) {
        return focused === index ? this.activeId : undefined;
    };
    TagListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-taglist',
                    template: "\n        <ul role=\"listbox\" class=\"k-reset\">\n            <li *ngFor=\"let dataItem of tags; let i = index;\"\n                [ngClass]=\"{'k-button': true, 'k-state-focused': i === focused }\"\n                [attr.id]=\"itemId(focused, i)\"\n            >\n                <span>\n                    <template *ngIf=\"template\"\n                        [templateContext]=\"{\n                        templateRef: template.templateRef,\n                        $implicit: dataItem\n                    }\">\n                    </template>\n                    <template [ngIf]=\"!template\">{{ tagText(dataItem) }}</template>\n                </span>\n                <span aria-label=\"delete\" class=\"k-select\">\n                    <span class=\"k-icon k-i-close\" (click)=\"tagCloseClick($event, dataItem)\">\n                    </span>\n                </span>\n            </li>\n        </ul>\n  "
                },] },
    ];
    /** @nocollapse */
    TagListComponent.ctorParameters = function () { return []; };
    TagListComponent.propDecorators = {
        'tags': [{ type: Input },],
        'textField': [{ type: Input },],
        'focused': [{ type: Input },],
        'template': [{ type: Input },],
        'disabled': [{ type: Input },],
        'activeId': [{ type: Input },],
        'removeTag': [{ type: Output },],
    };
    return TagListComponent;
}());
