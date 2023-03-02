/* tslint:disable:max-line-length */
import { Component, forwardRef, ElementRef, Input, Output, HostBinding, HostListener, EventEmitter, ContentChild, ViewChild, isDevMode, Renderer, Optional, Inject, NgZone } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/skipWhile';
import { Keys } from './common/keys';
import { isPresent, guid, isDocumentAvailable, getter, resolveValue } from './util';
import { DropDownsUtil as Util } from '@telerik/kendo-dropdowns-common';
import { SelectionService } from './selection.service';
import { NavigationService } from './navigation.service';
import { ItemTemplateDirective } from './templates/item-template.directive';
import { ValueTemplateDirective } from './templates/value-template.directive';
import { HeaderTemplateDirective } from './templates/header-template.directive';
import { FooterTemplateDirective } from './templates/footer-template.directive';
import { NoDataTemplateDirective } from './templates/no-data-template.directive';
import { NavigationAction } from './navigation-action';
import { PreventableEvent } from './common/preventable-event';
import { RTL } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
export var DROPDOWNLIST_VALUE_ACCESSOR = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return DropDownListComponent; })
};
/**
 * Represents the Kendo UI DropDownList component for Angular.
 *
 * @example
 * ```ts
 * @@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-dropdownlist [data]="listItems">
 *  </kendo-dropdownlist>
 * `
 * })
 * class AppComponent {
 *   public listItems: Array<string> = ["Item 1", "Item 2", "Item 3", "Item 4"];
 * }
 * ```
 */
export var DropDownListComponent = (function () {
    function DropDownListComponent(rtl, selectionService, navigationService, wrapper, renderer, zone) {
        /**
         * Sets the disabled state of the component.
         */
        this.disabled = false;
        /**
         * Enables the [filtering]({% slug overview_ddl_kendouiforangular %}#toc-filtering) functionality of the DropDownList.
         */
        this.filterable = false;
        /**
         * Enables a case-insensitive search. When `filtration` is disabled, use this option.
         */
        this.ignoreCase = true;
        /**
         * Sets the delay before an item search is performed. When `filtration` is disabled, use this option.
         */
        this.delay = 500;
        /**
         * Specifies the [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
         */
        this.tabIndex = 0;
        /**
         * Fires each time the value is changed.
         *
         * For more details, refer to the section on the [`valueChange`]({% slug overview_ddl_kendouiforangular %}#toc-on-value-change) event.
         */
        this.valueChange = new EventEmitter();
        /**
         * Fires each time the user types in the filter input. You can filter the source based on the passed filtration value.
         *
         * For more details, refer to the section on the [`filterChange`]({% slug overview_ddl_kendouiforangular %}#toc-on-filter-change) event.
         */
        this.filterChange = new EventEmitter();
        /**
         * Fires each time the item selection is changed.
         *
         * For more details, refer to the section on the [`selectionChange`]({% slug overview_ddl_kendouiforangular %}#toc-on-change-of-item-selection) event.
         */
        this.selectionChange = new EventEmitter();
        /**
         * Fires each time the popup is about to open.
         * This event is preventable. If you cancel the event, the popup will remain closed.
         */
        this.open = new EventEmitter();
        /**
         * Fires each time the popup is about to close.
         * This event is preventable. If you cancel the event, the popup will remain opened.
         */
        this.close = new EventEmitter();
        this.listBoxId = guid();
        this.optionPrefix = guid();
        this.filterText = "";
        this.isFocused = false;
        this.onTouchedCallback = function (_) { };
        this.onChangeCallback = function (_) { };
        this.word = "";
        this.last = "";
        this.filterFocused = new EventEmitter();
        this.wrapperBlurred = new EventEmitter();
        this._open = false;
        this._popupSettings = { height: 200, animate: true };
        this.direction = rtl ? 'rtl' : 'ltr';
        this.selectionService = selectionService;
        this.navigationService = navigationService;
        this.wrapper = wrapper.nativeElement;
        this.renderer = renderer;
        this._zone = zone;
        this.data = [];
        this.subscribeEvents();
    }
    Object.defineProperty(DropDownListComponent.prototype, "width", {
        get: function () {
            var wrapperOffsetWidth = 0;
            if (isDocumentAvailable()) {
                wrapperOffsetWidth = this.wrapper.offsetWidth;
            }
            var width = this.popupSettings.width || wrapperOffsetWidth;
            var minWidth = isNaN(wrapperOffsetWidth) ? wrapperOffsetWidth : wrapperOffsetWidth + "px";
            var maxWidth = isNaN(width) ? width : width + "px";
            return { min: minWidth, max: maxWidth };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownListComponent.prototype, "height", {
        get: function () {
            return this.popupSettings.height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownListComponent.prototype, "popupOpen", {
        get: function () {
            return this._open;
        },
        set: function (open) {
            if (this.disabled || this.popupOpen === open) {
                return;
            }
            var eventArgs = new PreventableEvent();
            if (open) {
                this.open.emit(eventArgs);
            }
            else {
                this.close.emit(eventArgs);
            }
            if (!eventArgs.isDefaultPrevented()) {
                this._open = open;
            }
            if (this.popupOpen) {
                this.popupWidth = this.width.max;
                this.popupMinWidth = this.width.min;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownListComponent.prototype, "data", {
        get: function () {
            return this._data;
        },
        /**
         * Sets the data of the DropDownList.
         *
         * > The data has to be provided in an array-like list.
         */
        set: function (data) {
            this._data = data || [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownListComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        /**
         * Sets the value of the DropDownList. It could be either of the primitive (string, numbers) or of the complex (objects) type. To define the type, use the `valuePrimitive` option.
         *
         * > Selected values that are not present in the source are ignored.
         */
        set: function (newValue) {
            this.verifySettings(newValue);
            this._value = newValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownListComponent.prototype, "popupSettings", {
        get: function () {
            return this._popupSettings;
        },
        /**
         * Configures the popup of the DropDownList.
         *
         * The available options are:
         * - `animation: Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
         * - `width: Number`&mdash;Sets the width of the popup container. By default, the width of the host element is used.
         * - `height: Number`&mdash;Sets the height of the popup container. By default, the height is 200px.
         * - `popupClass: String`&mdash;Specifies a list of CSS classes that are used to style the popup.
         */
        set: function (settings) {
            this._popupSettings = Object.assign({ height: 200, animate: true }, settings);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    DropDownListComponent.prototype.blur = function () {
        this.wrapperBlurred.emit();
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.focus = function () {
        this.isFocused = true;
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.keydown = function (event) {
        var hasSelected = isPresent(this.selectionService.selected[0]);
        var focused = isNaN(this.selectionService.focused) ? 0 : this.selectionService.focused;
        var offset = 0;
        if (this.disabled) {
            return;
        }
        if (!hasSelected) {
            if (event.keyCode === Keys.down) {
                offset = -1;
            }
            else if (event.keyCode === Keys.up) {
                offset = 1;
            }
        }
        var eventData = event;
        var action = this.navigationService.process({
            altKey: eventData.altKey,
            current: focused + offset,
            keyCode: eventData.keyCode,
            max: this.data.length - 1,
            min: this.defaultItem ? -1 : 0
        });
        var leftRightKeys = (action === NavigationAction.Left) || (action === NavigationAction.Right);
        if (action !== NavigationAction.Undefined &&
            action !== NavigationAction.Tab &&
            action !== NavigationAction.Backspace &&
            action !== NavigationAction.Delete &&
            !(leftRightKeys && this.filterable) &&
            (action !== NavigationAction.Enter || (action === NavigationAction.Enter && this.popupOpen))) {
            eventData.preventDefault();
        }
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.keypress = function (event) {
        if (!this.filterable) {
            this.onKeyPress(event);
        }
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.click = function () {
        this.popupOpen = !this.popupOpen;
        if (!this.popupOpen) {
            this.renderer.invokeElementMethod(this.wrapper, "focus");
        }
    };
    Object.defineProperty(DropDownListComponent.prototype, "widgetClasses", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownListComponent.prototype, "role", {
        get: function () {
            return "listbox";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownListComponent.prototype, "widgetTabIndex", {
        get: function () {
            return this.disabled ? undefined : this.tabIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownListComponent.prototype, "ariaDisabled", {
        get: function () {
            return this.disabled ? true : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownListComponent.prototype, "ariaHasPopup", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownListComponent.prototype, "ariaExpanded", {
        get: function () {
            return this.popupOpen;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownListComponent.prototype, "ariaOwns", {
        get: function () {
            return this.listBoxId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownListComponent.prototype, "ariaActivedescendant", {
        get: function () {
            return this.optionPrefix + "-" + getter(this.value, this.valueField);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownListComponent.prototype, "dir", {
        get: function () {
            return this.direction;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    DropDownListComponent.prototype.onFilterFocus = function () {
        this.filterFocused.emit();
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.popupOpened = function () {
        var _this = this;
        if (this.popupOpen && this.filterInput) {
            this._zone.runOutsideAngular(function () {
                _this.filterInput.nativeElement.focus();
            });
        }
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.ngOnDestroy = function () {
        this.unsubscribeEvents();
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.ngOnChanges = function (_changes) {
        if (this.valuePrimitive === undefined) {
            this.valuePrimitive = this.valueField ? false : true;
        }
        this.setState(this.value);
    };
    /**
     * Toggles the visibility of the popup. If you use the `toggle` method to open or close the popup, the `open` and `close` events will not be fired.
     *
     * @param open - The state of the popup.
     */
    DropDownListComponent.prototype.toggle = function (open) {
        this._open = (open === undefined) ? !this._open : open;
        if (this._open) {
            this.popupWidth = this.width.max;
            this.popupMinWidth = this.width.min;
        }
    };
    Object.defineProperty(DropDownListComponent.prototype, "isOpen", {
        /**
         * Returns the current open state of the popup.
         */
        get: function () {
            return this.popupOpen;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    DropDownListComponent.prototype.writeValue = function (newValue) {
        this.verifySettings(newValue);
        this.setState(newValue);
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    Object.defineProperty(DropDownListComponent.prototype, "listContainerClasses", {
        /**
         * @hidden
         */
        get: function () {
            var containerClasses = ['k-list-container', 'k-reset'];
            if (this.popupSettings.popupClass) {
                containerClasses.push(this.popupSettings.popupClass);
            }
            return containerClasses;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropDownListComponent.prototype, "buttonClasses", {
        /**
         * @hidden
         */
        get: function () {
            return (_a = {},
                _a[this.iconClass] = !this.loading && this.iconClass,
                _a['k-i-arrow-s'] = !this.loading && !this.iconClass,
                _a['k-i-loading'] = this.loading,
                _a['k-icon'] = true,
                _a
            );
            var _a;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    DropDownListComponent.prototype.setDefaultItemClasses = function () {
        return {
            'k-list-optionlabel': true
        };
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.getText = function () {
        return this.text;
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.getDefaultItemText = function () {
        return getter(this.defaultItem, this.textField);
    };
    DropDownListComponent.prototype.subscribeEvents = function () {
        var _this = this;
        if (!isDocumentAvailable()) {
            return;
        }
        this.changeSubscription = this.selectionService.onChange.subscribe(this.handleItemChange.bind(this));
        this.selectSubscription = this.selectionService.onSelect.subscribe(this.handleItemSelect.bind(this));
        this.navigationSubscription = Observable.merge(this.navigationService.up, this.navigationService.down, this.navigationService.left.skipWhile(function () { return _this.filterable; }), this.navigationService.right.skipWhile(function () { return _this.filterable; }), this.navigationService.home, this.navigationService.end)
            .subscribe(this.selectionService.select.bind(this.selectionService));
        this.openSubscription = this.navigationService.open.subscribe(function () { return _this.popupOpen = true; });
        this.closeSubscription = this.navigationService.close.subscribe(function () {
            _this.popupOpen = false;
            _this.renderer.invokeElementMethod(_this.wrapper, "focus");
        });
        this.enterSubscription = this.navigationService.enter
            .merge(this.navigationService.esc)
            .subscribe(this.handleEnter.bind(this));
        this._zone.runOutsideAngular(function () {
            _this.documentClick = Observable
                .fromEvent(document, 'click')
                .filter(function (event) {
                return !(_this.wrapper !== event.target && _this.wrapper.contains(event.target));
            });
            _this.componentBlurredSubscription = _this.wrapperBlurred
                .concatMap(function () { return Observable.interval(10).take(1).takeUntil(_this.filterFocused); })
                .merge(_this.navigationService.tab, _this.documentClick)
                .filter(function () { return _this.isFocused; })
                .subscribe(function () { return _this._zone.run(function () {
                _this.componentBlur();
            }); });
        });
    };
    DropDownListComponent.prototype.unsubscribeEvents = function () {
        if (!isDocumentAvailable()) {
            return;
        }
        this.changeSubscription.unsubscribe();
        this.selectSubscription.unsubscribe();
        this.navigationSubscription.unsubscribe();
        this.openSubscription.unsubscribe();
        this.closeSubscription.unsubscribe();
        this.enterSubscription.unsubscribe();
        this.componentBlurredSubscription.unsubscribe();
    };
    DropDownListComponent.prototype.handleItemChange = function (event) {
        var index = event.indices.length ? event.indices[0] : undefined;
        if (!isPresent(index)) {
            return;
        }
        var dataItem = isPresent(this.data[index]) ? this.data[index] : this.defaultItem;
        this.change(dataItem);
    };
    DropDownListComponent.prototype.handleItemSelect = function (event) {
        var index = event.indices.length ? event.indices[0] : undefined;
        if (!isPresent(index)) {
            return;
        }
        var dataItem = isPresent(this.data[index]) ? this.data[index] : this.defaultItem;
        if (this.popupOpen) {
            this.value = this.valuePrimitive ? getter(dataItem, this.valueField) : dataItem;
            this.text = getter(dataItem, this.textField);
            this.selectionChange.emit(dataItem);
        }
        else {
            this.change(dataItem);
        }
    };
    DropDownListComponent.prototype.handleEnter = function () {
        if (this.popupOpen) {
            this.change(this.data[this.selectionService.focused]);
            this.renderer.invokeElementMethod(this.wrapper, "focus");
        }
    };
    DropDownListComponent.prototype.verifySettings = function (newValue) {
        var valueOrText = !isPresent(this.valueField) !== !isPresent(this.textField);
        if (!isDevMode()) {
            return;
        }
        if (this.defaultItem && this.valueField && typeof this.defaultItem !== "object") {
            throw new Error("defaultItem and data items must be of same type. See http://www.telerik.com/kendo-angular-ui/components/dropdowns/api/DropDownListComponent/#toc-defaultitem");
        }
        if (this.valuePrimitive === true && isPresent(newValue) && typeof newValue === "object") {
            throw new Error("Expected initial value of primitive type. See http://www.telerik.com/kendo-angular-ui/components/dropdowns/dropdownlist/#toc-value-selection");
        }
        if (this.valuePrimitive === false && isPresent(newValue) && typeof newValue !== "object") {
            throw new Error("Expected initial value of type Object. See http://www.telerik.com/kendo-angular-ui/components/dropdowns/dropdownlist/#toc-value-selection");
        }
        if (valueOrText) {
            throw new Error("Expected textField and valueField options to be set. See http://www.telerik.com/kendo-angular-ui/components/dropdowns/dropdownlist/#toc-bind-to-arrays-of-complex-data");
        }
    };
    DropDownListComponent.prototype.componentBlur = function () {
        if (getter(this._previousValue, this.valueField) !== getter(this.value, this.valueField)) {
            this.change(this.value);
        }
        else {
            this.popupOpen = false;
        }
        this.onTouchedCallback();
        this.isFocused = false;
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.onMouseDown = function (event) {
        var tagName = event.target.tagName.toLowerCase();
        if (tagName !== "input") {
            event.preventDefault();
        }
    };
    DropDownListComponent.prototype.onKeyPress = function (event) {
        if (event.which === 0 || event.keyCode === Keys.enter) {
            return;
        }
        var character = String.fromCharCode(event.charCode || event.keyCode);
        if (this.ignoreCase) {
            character = character.toLowerCase();
        }
        if (character === " ") {
            event.preventDefault();
        }
        this.word += character;
        this.last = character;
        this.search();
    };
    DropDownListComponent.prototype.search = function () {
        var _this = this;
        clearTimeout(this.typingTimeout);
        if (!this.filterable) {
            this.typingTimeout = setTimeout(function () { _this.word = ""; }, this.delay);
            this.selectNext();
        }
    };
    DropDownListComponent.prototype.selectNext = function () {
        var data = this.data.map(function (item, index) {
            return { item: item, itemIndex: index };
        });
        var isInLoop = Util.sameCharsOnly(this.word, this.last);
        var dataLength = data.length;
        var startIndex = isNaN(this.selectionService.selected[0]) ? 0 : this.selectionService.selected[0];
        var text, index, defaultItem;
        if (this.defaultItem) {
            defaultItem = { item: this.defaultItem, itemIndex: -1 };
            dataLength += 1;
            startIndex += 1;
        }
        startIndex += isInLoop ? 1 : 0;
        data = Util.shuffleData(data, startIndex, defaultItem);
        index = 0;
        for (; index < dataLength; index++) {
            text = getter(data[index].item, this.textField);
            var loopMatch = Boolean(isInLoop && Util.matchText(text, this.last, this.ignoreCase));
            var nextMatch = Boolean(Util.matchText(text, this.word, this.ignoreCase));
            if (loopMatch || nextMatch) {
                index = data[index].itemIndex;
                break;
            }
        }
        if (index !== dataLength) {
            this.navigate(index);
        }
    };
    DropDownListComponent.prototype.change = function (dataItem) {
        dataItem = dataItem || this.defaultItem;
        this.popupOpen = false;
        if (getter(this._previousValue, this.valueField) === getter(dataItem, this.valueField)) {
            return;
        }
        var primitiveValue = getter(dataItem, this.valueField);
        this.value = this.valuePrimitive ? getter(dataItem, this.valueField) : dataItem;
        this.text = getter(dataItem, this.textField);
        this._previousValue = this.value;
        this.selectionChange.emit(this.valuePrimitive ? primitiveValue : this.value);
        this.onChangeCallback(this.valuePrimitive ? primitiveValue : this.value);
        this.valueChange.emit(this.valuePrimitive ? primitiveValue : this.value);
        if (this.filterable) {
            this.filterText = "";
            this.filterChange.emit(this.filterText);
        }
    };
    DropDownListComponent.prototype.navigate = function (index) {
        this.selectionService.select(index);
    };
    DropDownListComponent.prototype.setState = function (value) {
        var newValue = isPresent(getter(value, this.valueField)) ? getter(value, this.valueField) : value;
        var valueCandidate;
        var textCandidate;
        if (!this.data.length) {
            if (isPresent(value)) {
                valueCandidate = value;
            }
            else {
                valueCandidate = this.valuePrimitive ? getter(this.defaultItem, this.valueField) : this.defaultItem;
            }
            textCandidate = getter(isPresent(value) ? value : this.defaultItem, this.textField);
        }
        else {
            this.verifySettings(value);
            var result = resolveValue({
                data: this.data,
                defaultItem: this.defaultItem,
                value: newValue,
                valueField: this.valueField
            });
            if (result.dataItem) {
                this.selectionService.resetSelection(result.selected);
                if (this.filterText) {
                    this.selectionService.focused = 0;
                }
                valueCandidate = this.valuePrimitive ? getter(result.dataItem, this.valueField) : result.dataItem;
                textCandidate = getter(result.dataItem, this.textField);
            }
            else if (value !== undefined) {
                this.selectionService.resetSelection([]);
                this.selectionService.focused = 0;
                valueCandidate = this.value;
                textCandidate = this.text;
            }
            else {
                this.selectionService.resetSelection(this.defaultItem ? [-1] : []);
                this.selectionService.focused = 0;
                valueCandidate = this.valuePrimitive ? getter(this.defaultItem, this.valueField) : this.defaultItem;
                textCandidate = getter(this.defaultItem, this.textField);
            }
        }
        this.value = valueCandidate;
        this.text = textCandidate;
        this._previousValue = this.value;
    };
    /**
     * @hidden
     */
    DropDownListComponent.prototype.handleFilter = function (event) {
        this.filterChange.emit(event.target.value);
    };
    DropDownListComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'kendoDropDownList',
                    providers: [DROPDOWNLIST_VALUE_ACCESSOR, SelectionService, NavigationService],
                    selector: 'kendo-dropdownlist',
                    template: "\n        <span #anchor unselectable=\"on\"\n          [ngClass]=\"{\n            'k-dropdown-wrap': true,\n            'k-state-default': !this.disabled,\n            'k-state-disabled': this.disabled,\n            'k-state-focused': this.isFocused\n        }\" >\n           <span [ngClass]=\"{ 'k-input': true }\" unselectable=\"on\">\n               <template *ngIf=\"valueTemplate\"\n                   [templateContext]=\"{\n                       templateRef: valueTemplate.templateRef,\n                       $implicit: value\n                   }\">\n               </template>\n               <template [ngIf]=\"!valueTemplate\">{{ getText() }}</template>\n           </span>\n           <span [ngClass]=\"{ 'k-select': true}\" unselectable=\"on\">\n               <span [ngClass]=\"buttonClasses\"></span>\n           </span>\n        </span>\n        <kendo-popup *ngIf=\"popupOpen\"\n            [anchor]=\"anchor\"\n            [animate]=\"popupSettings.animate\"\n            [popupClass]=\"listContainerClasses\"\n            [style.width]=\"popupWidth\"\n            [style.minWidth]=\"popupMinWidth\"\n            (anchorViewportLeave)=\"popupOpen=false\"\n            (mousedown)=\"onMouseDown($event)\"\n            (open)=\"popupOpened()\">\n            <!--filterable-->\n            <template [ngIf]=\"filterable\">\n                <span [ngClass]=\"{ 'k-list-filter': true }\" (click)=\"$event.stopImmediatePropagation()\">\n                    <input #filterInput\n                        [dir]=\"dir\"\n                        [(ngModel)]=\"filterText\"\n                        class=\"k-textbox\"\n                        (input)=\"handleFilter($event)\"\n                        (focus)=\"onFilterFocus()\" />\n                    <span [ngClass]=\"{ 'k-icon': true, 'k-i-search': true }\" unselectable=\"on\"></span>\n                </span>\n            </template>\n            <!--default item-->\n            <template [ngIf]=\"defaultItem && !itemTemplate\">\n                <div [ngClass]=\"setDefaultItemClasses()\" kendoDropDownsSelectable [index]=\"-1\">\n                    {{ getDefaultItemText() }}\n                </div>\n            </template>\n            <template [ngIf]=\"defaultItem && itemTemplate\">\n                <div [ngClass]=\"setDefaultItemClasses()\" kendoDropDownsSelectable [index]=\"-1\">\n                    <template\n                        [templateContext]=\"{\n                            templateRef: itemTemplate.templateRef,\n                            $implicit: defaultItem\n                        }\">\n                    </template>\n                </div>\n            </template>\n            <!--header template-->\n            <template *ngIf=\"headerTemplate\"\n                [templateContext]=\"{\n                    templateRef: headerTemplate.templateRef\n                }\">\n            </template>\n            <!--list-->\n            <kendo-list\n                [id]=\"listBoxId\"\n                [optionPrefix]=\"optionPrefix\"\n                [data]=\"data\"\n                [textField]=\"textField\"\n                [valueField]=\"valueField\"\n                [template]=\"itemTemplate\"\n                [height]=\"height\"\n                [show]=\"popupOpen\"\n                >\n            </kendo-list>\n            <!--no-data template-->\n            <div class=\"k-nodata\" *ngIf=\"data.length === 0\">\n                <template [ngIf]=\"noDataTemplate\"\n                    [templateContext]=\"{\n                        templateRef: noDataTemplate ? noDataTemplate.templateRef : undefined\n                    }\">\n                </template>\n                <template [ngIf]=\"!noDataTemplate\">\n                    <div>NO DATA FOUND.</div>\n                </template>\n            </div>\n            <!--footer template-->\n            <template *ngIf=\"footerTemplate\"\n                [templateContext]=\"{\n                    templateRef: footerTemplate.templateRef\n                }\">\n            </template>\n        </kendo-popup>\n  "
                },] },
    ];
    /** @nocollapse */
    DropDownListComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [RTL,] },] },
        { type: SelectionService, },
        { type: NavigationService, },
        { type: ElementRef, },
        { type: Renderer, },
        { type: NgZone, },
    ]; };
    DropDownListComponent.propDecorators = {
        'iconClass': [{ type: Input },],
        'loading': [{ type: Input },],
        'data': [{ type: Input },],
        'value': [{ type: Input },],
        'textField': [{ type: Input },],
        'valueField': [{ type: Input },],
        'popupSettings': [{ type: Input },],
        'defaultItem': [{ type: Input },],
        'disabled': [{ type: Input },],
        'filterable': [{ type: Input },],
        'ignoreCase': [{ type: Input },],
        'delay': [{ type: Input },],
        'valuePrimitive': [{ type: Input },],
        'tabIndex': [{ type: Input },],
        'valueChange': [{ type: Output },],
        'filterChange': [{ type: Output },],
        'selectionChange': [{ type: Output },],
        'open': [{ type: Output },],
        'close': [{ type: Output },],
        'itemTemplate': [{ type: ContentChild, args: [ItemTemplateDirective,] },],
        'valueTemplate': [{ type: ContentChild, args: [ValueTemplateDirective,] },],
        'headerTemplate': [{ type: ContentChild, args: [HeaderTemplateDirective,] },],
        'footerTemplate': [{ type: ContentChild, args: [FooterTemplateDirective,] },],
        'noDataTemplate': [{ type: ContentChild, args: [NoDataTemplateDirective,] },],
        'filterInput': [{ type: ViewChild, args: ['filterInput',] },],
        'blur': [{ type: HostListener, args: ['blur',] },],
        'focus': [{ type: HostListener, args: ['focus',] },],
        'keydown': [{ type: HostListener, args: ['keydown', ['$event'],] },],
        'keypress': [{ type: HostListener, args: ['keypress', ['$event'],] },],
        'click': [{ type: HostListener, args: ['click',] },],
        'widgetClasses': [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-dropdown',] }, { type: HostBinding, args: ['class.k-header',] },],
        'role': [{ type: HostBinding, args: ['attr.role',] },],
        'widgetTabIndex': [{ type: HostBinding, args: ['attr.tabindex',] },],
        'ariaDisabled': [{ type: HostBinding, args: ['attr.aria-disabled',] },],
        'ariaHasPopup': [{ type: HostBinding, args: ['attr.aria-haspopup',] },],
        'ariaExpanded': [{ type: HostBinding, args: ['attr.aria-expanded',] },],
        'ariaOwns': [{ type: HostBinding, args: ['attr.aria-owns',] },],
        'ariaActivedescendant': [{ type: HostBinding, args: ['attr.aria-activedescendant',] },],
        'dir': [{ type: HostBinding, args: ['attr.dir',] },],
    };
    return DropDownListComponent;
}());
