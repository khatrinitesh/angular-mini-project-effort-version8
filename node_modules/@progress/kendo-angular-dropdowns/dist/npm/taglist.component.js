"use strict";
/* tslint:disable:max-line-length */
var core_1 = require('@angular/core');
/**
 * @hidden
 */
var TagListComponent = (function () {
    function TagListComponent() {
        this.removeTag = new core_1.EventEmitter();
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
        { type: core_1.Component, args: [{
                    selector: 'kendo-taglist',
                    template: "\n        <ul role=\"listbox\" class=\"k-reset\">\n            <li *ngFor=\"let dataItem of tags; let i = index;\"\n                [ngClass]=\"{'k-button': true, 'k-state-focused': i === focused }\"\n                [attr.id]=\"itemId(focused, i)\"\n            >\n                <span>\n                    <template *ngIf=\"template\"\n                        [templateContext]=\"{\n                        templateRef: template.templateRef,\n                        $implicit: dataItem\n                    }\">\n                    </template>\n                    <template [ngIf]=\"!template\">{{ tagText(dataItem) }}</template>\n                </span>\n                <span aria-label=\"delete\" class=\"k-select\">\n                    <span class=\"k-icon k-i-close\" (click)=\"tagCloseClick($event, dataItem)\">\n                    </span>\n                </span>\n            </li>\n        </ul>\n  "
                },] },
    ];
    /** @nocollapse */
    TagListComponent.ctorParameters = function () { return []; };
    TagListComponent.propDecorators = {
        'tags': [{ type: core_1.Input },],
        'textField': [{ type: core_1.Input },],
        'focused': [{ type: core_1.Input },],
        'template': [{ type: core_1.Input },],
        'disabled': [{ type: core_1.Input },],
        'activeId': [{ type: core_1.Input },],
        'removeTag': [{ type: core_1.Output },],
    };
    return TagListComponent;
}());
exports.TagListComponent = TagListComponent;
