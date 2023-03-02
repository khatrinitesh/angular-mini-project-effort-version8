import { Component, Renderer, Input, Output, EventEmitter, ViewChild, HostBinding, Optional, Inject } from '@angular/core';
import { Keys } from './common/keys';
import { combineStr, isDocumentAvailable } from './util';
import { RTL } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
export var SearchBarComponent = (function () {
    function SearchBarComponent(rtl, renderer) {
        this.valueChange = new EventEmitter();
        this.onBlur = new EventEmitter();
        this.onFocus = new EventEmitter();
        this.onClick = new EventEmitter();
        this.onNavigate = new EventEmitter();
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
            this.writeInputValue(this.suggestedText ? combineStr(this.userInput, this.suggestedText) : this.userInput);
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
        if (isDocumentAvailable()) {
            this.renderer.setElementProperty(this.input.nativeElement, 'value', text);
        }
    };
    SearchBarComponent.prototype.setInputSelection = function (start, end) {
        if (isDocumentAvailable()) {
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
        var keys = [Keys.up, Keys.down, Keys.left, Keys.right, Keys.enter,
            Keys.esc, Keys.delete, Keys.backspace, Keys.home, Keys.end];
        if (keys.indexOf(keyCode) > -1) {
            this.onNavigate.emit(event);
        }
    };
    SearchBarComponent.prototype.focus = function () {
        if (isDocumentAvailable()) {
            this.renderer.invokeElementMethod(this.input.nativeElement, 'focus');
        }
    };
    SearchBarComponent.prototype.resizeInput = function (size) {
        var input = this.input.nativeElement;
        this.renderer.setElementAttribute(input, 'size', size.toString());
    };
    SearchBarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'kendo-searchbar',
                    template: "\n        <input #input\n            [disabled]=\"disabled\"\n            [placeholder]=\"placeholder\"\n            [class]=\"'k-input'\"\n            (input)=\"handleInput($event)\"\n            (focus)=\"handleFocus($event)\"\n            (blur)=\"handleBlur($event)\"\n            (keydown)=\"handleKeydown($event)\"\n            [attr.aria-activedescendant]=\"activeId\"\n            [attr.dir]=\"direction\"\n        />\n   "
                },] },
    ];
    /** @nocollapse */
    SearchBarComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [RTL,] },] },
        { type: Renderer, },
    ]; };
    SearchBarComponent.propDecorators = {
        'disabled': [{ type: Input },],
        'placeholder': [{ type: Input },],
        'activeId': [{ type: Input },],
        'userInput': [{ type: Input },],
        'suggestedText': [{ type: Input },],
        'valueChange': [{ type: Output },],
        'onBlur': [{ type: Output },],
        'onFocus': [{ type: Output },],
        'onClick': [{ type: Output },],
        'onNavigate': [{ type: Output },],
        'input': [{ type: ViewChild, args: ["input",] },],
        'searchBarClass': [{ type: HostBinding, args: ['class.k-searchbar',] },],
    };
    return SearchBarComponent;
}());
