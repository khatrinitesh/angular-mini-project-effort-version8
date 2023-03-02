"use strict";
/* tslint:disable:member-ordering */
var core_1 = require('@angular/core');
var keys_1 = require('./common/keys');
var util_1 = require('./util');
var kendo_angular_l10n_1 = require('@progress/kendo-angular-l10n');
/**
 * @hidden
 */
var SearchBarComponent = (function () {
    function SearchBarComponent(rtl, renderer) {
        this.valueChange = new core_1.EventEmitter();
        this.onBlur = new core_1.EventEmitter();
        this.onFocus = new core_1.EventEmitter();
        this.onClick = new core_1.EventEmitter();
        this.onNavigate = new core_1.EventEmitter();
        this._userInput = "";
        this.direction = rtl ? 'rtl' : 'ltr';
        this.renderer = renderer;
    }
    Object.defineProperty(SearchBarComponent.prototype, "userInput", {
        get: function () {
            return this._userInput;
        },
        set: function (userInput) {
            this._userInput = userInput || "";
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(SearchBarComponent.prototype, "searchBarClass", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchBarComponent.prototype, "value", {
        get: function () {
            return this.input.nativeElement.value;
        },
        enumerable: true,
        configurable: true
    });
    SearchBarComponent.prototype.ngOnChanges = function (changes) {
        if (this.input && (changes.userInput || changes.suggestedText)) {
            var previousUserInput = (changes.userInput && changes.userInput.previousValue) ? changes.userInput.previousValue : "";
            var caretIndex = this.input.nativeElement.selectionStart;
            var caretAtEnd = previousUserInput.length === caretIndex;
            this.writeInputValue(this.suggestedText ? util_1.combineStr(this.userInput, this.suggestedText) : this.userInput);
            if (this.suggestedText) {
                this.setInputSelection(this.userInput.length, this.suggestedText.length);
            }
            else if (caretAtEnd) {
                this.setInputSelection(this.userInput.length, this.userInput.length);
            }
            else {
                this.setInputSelection(caretIndex, caretIndex);
            }
        }
    };
    SearchBarComponent.prototype.writeInputValue = function (text) {
        if (util_1.isDocumentAvailable()) {
            this.renderer.setElementProperty(this.input.nativeElement, 'value', text);
        }
    };
    SearchBarComponent.prototype.setInputSelection = function (start, end) {
        if (util_1.isDocumentAvailable()) {
            this.renderer.invokeElementMethod(this.input.nativeElement, 'setSelectionRange', [start, end]);
        }
    };
    SearchBarComponent.prototype.handleInput = function (event) {
        var text = event.target.value;
        if (text !== this.userInput) {
            this.valueChange.emit(text);
        }
    };
    SearchBarComponent.prototype.handleFocus = function (event) {
        this.onFocus.emit(event);
    };
    SearchBarComponent.prototype.handleBlur = function (event) {
        this.onBlur.emit(event);
    };
    SearchBarComponent.prototype.handleKeydown = function (event) {
        var keyCode = event.keyCode;
        var keys = [keys_1.Keys.up, keys_1.Keys.down, keys_1.Keys.left, keys_1.Keys.right, keys_1.Keys.enter,
            keys_1.Keys.esc, keys_1.Keys.delete, keys_1.Keys.backspace, keys_1.Keys.home, keys_1.Keys.end];
        if (keys.indexOf(keyCode) > -1) {
            this.onNavigate.emit(event);
        }
    };
    SearchBarComponent.prototype.focus = function () {
        if (util_1.isDocumentAvailable()) {
            this.renderer.invokeElementMethod(this.input.nativeElement, 'focus');
        }
    };
    SearchBarComponent.prototype.resizeInput = function (size) {
        var input = this.input.nativeElement;
        this.renderer.setElementAttribute(input, 'size', size.toString());
    };
    SearchBarComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'kendo-searchbar',
                    template: "\n        <input #input\n            [disabled]=\"disabled\"\n            [placeholder]=\"placeholder\"\n            [class]=\"'k-input'\"\n            (input)=\"handleInput($event)\"\n            (focus)=\"handleFocus($event)\"\n            (blur)=\"handleBlur($event)\"\n            (keydown)=\"handleKeydown($event)\"\n            [attr.aria-activedescendant]=\"activeId\"\n            [attr.dir]=\"direction\"\n        />\n   "
                },] },
    ];
    /** @nocollapse */
    SearchBarComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [kendo_angular_l10n_1.RTL,] },] },
        { type: core_1.Renderer, },
    ]; };
    SearchBarComponent.propDecorators = {
        'disabled': [{ type: core_1.Input },],
        'placeholder': [{ type: core_1.Input },],
        'activeId': [{ type: core_1.Input },],
        'userInput': [{ type: core_1.Input },],
        'suggestedText': [{ type: core_1.Input },],
        'valueChange': [{ type: core_1.Output },],
        'onBlur': [{ type: core_1.Output },],
        'onFocus': [{ type: core_1.Output },],
        'onClick': [{ type: core_1.Output },],
        'onNavigate': [{ type: core_1.Output },],
        'input': [{ type: core_1.ViewChild, args: ["input",] },],
        'searchBarClass': [{ type: core_1.HostBinding, args: ['class.k-searchbar',] },],
    };
    return SearchBarComponent;
}());
exports.SearchBarComponent = SearchBarComponent;
