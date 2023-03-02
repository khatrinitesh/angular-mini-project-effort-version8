/* tslint:disable:max-line-length */
"use strict";
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/observable/fromEvent');
require('rxjs/add/observable/interval');
require('rxjs/add/operator/filter');
require('rxjs/add/operator/take');
require('rxjs/add/operator/takeUntil');
require('rxjs/add/operator/concatMap');
require('rxjs/add/operator/merge');
require('rxjs/add/operator/skipWhile');
var keys_1 = require('./common/keys');
var util_1 = require('./util');
var kendo_dropdowns_common_1 = require('@telerik/kendo-dropdowns-common');
var selection_service_1 = require('./selection.service');
var navigation_service_1 = require('./navigation.service');
var item_template_directive_1 = require('./templates/item-template.directive');
var value_template_directive_1 = require('./templates/value-template.directive');
var header_template_directive_1 = require('./templates/header-template.directive');
var footer_template_directive_1 = require('./templates/footer-template.directive');
var no_data_template_directive_1 = require('./templates/no-data-template.directive');
var navigation_action_1 = require('./navigation-action');
var preventable_event_1 = require('./common/preventable-event');
var kendo_angular_l10n_1 = require('@progress/kendo-angular-l10n');
/**
 * @hidden
 */
exports.DROPDOWNLIST_VALUE_ACCESSOR = {
    multi: true,
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return DropDownListComponent; })
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
var DropDownListComponent = (function () {
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
        this.valueChange = new core_1.EventEmitter();
        /**
         * Fires each time the user types in the filter input. You can filter the source based on the passed filtration value.
         *
         * For more details, refer to the section on the [`filterChange`]({% slug overview_ddl_kendouiforangular %}#toc-on-filter-change) event.
         */
        this.filterChange = new core_1.EventEmitter();
        /**
         * Fires each time the item selection is changed.
         *
         * For more details, refer to the section on the [`selectionChange`]({% slug overview_ddl_kendouiforangular %}#toc-on-change-of-item-selection) event.
         */
        this.selectionChange = new core_1.EventEmitter();
        /**
         * Fires each time the popup is about to open.
         * This event is preventable. If you cancel the event, the popup will remain closed.
         */
        this.open = new core_1.EventEmitter();
        /**
         * Fires each time the popup is about to close.
         * This event is preventable. If you cancel the event, the popup will remain opened.
         */
        this.close = new core_1.EventEmitter();
        this.listBoxId = util_1.guid();
        this.optionPrefix = util_1.guid();
        this.filterText = "";
        this.isFocused = false;
        this.onTouchedCallback = function (_) { };
        this.onChangeCallback = function (_) { };
        this.word = "";
        this.last = "";
        this.filterFocused = new core_1.EventEmitter();
        this.wrapperBlurred = new core_1.EventEmitter();
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
            if (util_1.isDocumentAvailable()) {
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
            var eventArgs = new preventable_event_1.PreventableEvent();
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
        var hasSelected = util_1.isPresent(this.selectionService.selected[0]);
        var focused = isNaN(this.selectionService.focused) ? 0 : this.selectionService.focused;
        var offset = 0;
        if (this.disabled) {
            return;
        }
        if (!hasSelected) {
            if (event.keyCode === keys_1.Keys.down) {
                offset = -1;
            }
            else if (event.keyCode === keys_1.Keys.up) {
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
        var leftRightKeys = (action === navigation_action_1.NavigationAction.Left) || (action === navigation_action_1.NavigationAction.Right);
        if (action !== navigation_action_1.NavigationAction.Undefined &&
            action !== navigation_action_1.NavigationAction.Tab &&
            action !== navigation_action_1.NavigationAction.Backspace &&
            action !== navigation_action_1.NavigationAction.Delete &&
            !(leftRightKeys && this.filterable) &&
            (action !== navigation_action_1.NavigationAction.Enter || (action === navigation_action_1.NavigationAction.Enter && this.popupOpen))) {
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
            return this.optionPrefix + "-" + util_1.getter(this.value, this.valueField);
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
        return util_1.getter(this.defaultItem, this.textField);
    };
    DropDownListComponent.prototype.subscribeEvents = function () {
        var _this = this;
        if (!util_1.isDocumentAvailable()) {
            return;
        }
        this.changeSubscription = this.selectionService.onChange.subscribe(this.handleItemChange.bind(this));
        this.selectSubscription = this.selectionService.onSelect.subscribe(this.handleItemSelect.bind(this));
        this.navigationSubscription = Observable_1.Observable.merge(this.navigationService.up, this.navigationService.down, this.navigationService.left.skipWhile(function () { return _this.filterable; }), this.navigationService.right.skipWhile(function () { return _this.filterable; }), this.navigationService.home, this.navigationService.end)
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
            _this.documentClick = Observable_1.Observable
                .fromEvent(document, 'click')
                .filter(function (event) {
                return !(_this.wrapper !== event.target && _this.wrapper.contains(event.target));
            });
            _this.componentBlurredSubscription = _this.wrapperBlurred
                .concatMap(function () { return Observable_1.Observable.interval(10).take(1).takeUntil(_this.filterFocused); })
                .merge(_this.navigationService.tab, _this.documentClick)
                .filter(function () { return _this.isFocused; })
                .subscribe(function () { return _this._zone.run(function () {
                _this.componentBlur();
            }); });
        });
    };
    DropDownListComponent.prototype.unsubscribeEvents = function () {
        if (!util_1.isDocumentAvailable()) {
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
        if (!util_1.isPresent(index)) {
            return;
        }
        var dataItem = util_1.isPresent(this.data[index]) ? this.data[index] : this.defaultItem;
        this.change(dataItem);
    };
    DropDownListComponent.prototype.handleItemSelect = function (event) {
        var index = event.indices.length ? event.indices[0] : undefined;
        if (!util_1.isPresent(index)) {
            return;
        }
        var dataItem = util_1.isPresent(this.data[index]) ? this.data[index] : this.defaultItem;
        if (this.popupOpen) {
            this.value = this.valuePrimitive ? util_1.getter(dataItem, this.valueField) : dataItem;
            this.text = util_1.getter(dataItem, this.textField);
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
        var valueOrText = !util_1.isPresent(this.valueField) !== !util_1.isPresent(this.textField);
        if (!core_1.isDevMode()) {
            return;
        }
        if (this.defaultItem && this.valueField && typeof this.defaultItem !== "object") {
            throw new Error("defaultItem and data items must be of same type. See http://www.telerik.com/kendo-angular-ui/components/dropdowns/api/DropDownListComponent/#toc-defaultitem");
        }
        if (this.valuePrimitive === true && util_1.isPresent(newValue) && typeof newValue === "object") {
            throw new Error("Expected initial value of primitive type. See http://www.telerik.com/kendo-angular-ui/components/dropdowns/dropdownlist/#toc-value-selection");
        }
        if (this.valuePrimitive === false && util_1.isPresent(newValue) && typeof newValue !== "object") {
            throw new Error("Expected initial value of type Object. See http://www.telerik.com/kendo-angular-ui/components/dropdowns/dropdownlist/#toc-value-selection");
        }
        if (valueOrText) {
            throw new Error("Expected textField and valueField options to be set. See http://www.telerik.com/kendo-angular-ui/components/dropdowns/dropdownlist/#toc-bind-to-arrays-of-complex-data");
        }
    };
    DropDownListComponent.prototype.componentBlur = function () {
        if (util_1.getter(this._previousValue, this.valueField) !== util_1.getter(this.value, this.valueField)) {
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
        if (event.which === 0 || event.keyCode === keys_1.Keys.enter) {
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
        var isInLoop = kendo_dropdowns_common_1.DropDownsUtil.sameCharsOnly(this.word, this.last);
        var dataLength = data.length;
        var startIndex = isNaN(this.selectionService.selected[0]) ? 0 : this.selectionService.selected[0];
        var text, index, defaultItem;
        if (this.defaultItem) {
            defaultItem = { item: this.defaultItem, itemIndex: -1 };
            dataLength += 1;
            startIndex += 1;
        }
        startIndex += isInLoop ? 1 : 0;
        data = kendo_dropdowns_common_1.DropDownsUtil.shuffleData(data, startIndex, defaultItem);
        index = 0;
        for (; index < dataLength; index++) {
            text = util_1.getter(data[index].item, this.textField);
            var loopMatch = Boolean(isInLoop && kendo_dropdowns_common_1.DropDownsUtil.matchText(text, this.last, this.ignoreCase));
            var nextMatch = Boolean(kendo_dropdowns_common_1.DropDownsUtil.matchText(text, this.word, this.ignoreCase));
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
        if (util_1.getter(this._previousValue, this.valueField) === util_1.getter(dataItem, this.valueField)) {
            return;
        }
        var primitiveValue = util_1.getter(dataItem, this.valueField);
        this.value = this.valuePrimitive ? util_1.getter(dataItem, this.valueField) : dataItem;
        this.text = util_1.getter(dataItem, this.textField);
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
        var newValue = util_1.isPresent(util_1.getter(value, this.valueField)) ? util_1.getter(value, this.valueField) : value;
        var valueCandidate;
        var textCandidate;
        if (!this.data.length) {
            if (util_1.isPresent(value)) {
                valueCandidate = value;
            }
            else {
                valueCandidate = this.valuePrimitive ? util_1.getter(this.defaultItem, this.valueField) : this.defaultItem;
            }
            textCandidate = util_1.getter(util_1.isPresent(value) ? value : this.defaultItem, this.textField);
        }
        else {
            this.verifySettings(value);
            var result = util_1.resolveValue({
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
                valueCandidate = this.valuePrimitive ? util_1.getter(result.dataItem, this.valueField) : result.dataItem;
                textCandidate = util_1.getter(result.dataItem, this.textField);
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
                valueCandidate = this.valuePrimitive ? util_1.getter(this.defaultItem, this.valueField) : this.defaultItem;
                textCandidate = util_1.getter(this.defaultItem, this.textField);
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
        { type: core_1.Component, args: [{
                    exportAs: 'kendoDropDownList',
                    providers: [exports.DROPDOWNLIST_VALUE_ACCESSOR, selection_service_1.SelectionService, navigation_service_1.NavigationService],
                    selector: 'kendo-dropdownlist',
                    template: "\n        <span #anchor unselectable=\"on\"\n          [ngClass]=\"{\n            'k-dropdown-wrap': true,\n            'k-state-default': !this.disabled,\n            'k-state-disabled': this.disabled,\n            'k-state-focused': this.isFocused\n        }\" >\n           <span [ngClass]=\"{ 'k-input': true }\" unselectable=\"on\">\n               <template *ngIf=\"valueTemplate\"\n                   [templateContext]=\"{\n                       templateRef: valueTemplate.templateRef,\n                       $implicit: value\n                   }\">\n               </template>\n               <template [ngIf]=\"!valueTemplate\">{{ getText() }}</template>\n           </span>\n           <span [ngClass]=\"{ 'k-select': true}\" unselectable=\"on\">\n               <span [ngClass]=\"buttonClasses\"></span>\n           </span>\n        </span>\n        <kendo-popup *ngIf=\"popupOpen\"\n            [anchor]=\"anchor\"\n            [animate]=\"popupSettings.animate\"\n            [popupClass]=\"listContainerClasses\"\n            [style.width]=\"popupWidth\"\n            [style.minWidth]=\"popupMinWidth\"\n            (anchorViewportLeave)=\"popupOpen=false\"\n            (mousedown)=\"onMouseDown($event)\"\n            (open)=\"popupOpened()\">\n            <!--filterable-->\n            <template [ngIf]=\"filterable\">\n                <span [ngClass]=\"{ 'k-list-filter': true }\" (click)=\"$event.stopImmediatePropagation()\">\n                    <input #filterInput\n                        [dir]=\"dir\"\n                        [(ngModel)]=\"filterText\"\n                        class=\"k-textbox\"\n                        (input)=\"handleFilter($event)\"\n                        (focus)=\"onFilterFocus()\" />\n                    <span [ngClass]=\"{ 'k-icon': true, 'k-i-search': true }\" unselectable=\"on\"></span>\n                </span>\n            </template>\n            <!--default item-->\n            <template [ngIf]=\"defaultItem && !itemTemplate\">\n                <div [ngClass]=\"setDefaultItemClasses()\" kendoDropDownsSelectable [index]=\"-1\">\n                    {{ getDefaultItemText() }}\n                </div>\n            </template>\n            <template [ngIf]=\"defaultItem && itemTemplate\">\n                <div [ngClass]=\"setDefaultItemClasses()\" kendoDropDownsSelectable [index]=\"-1\">\n                    <template\n                        [templateContext]=\"{\n                            templateRef: itemTemplate.templateRef,\n                            $implicit: defaultItem\n                        }\">\n                    </template>\n                </div>\n            </template>\n            <!--header template-->\n            <template *ngIf=\"headerTemplate\"\n                [templateContext]=\"{\n                    templateRef: headerTemplate.templateRef\n                }\">\n            </template>\n            <!--list-->\n            <kendo-list\n                [id]=\"listBoxId\"\n                [optionPrefix]=\"optionPrefix\"\n                [data]=\"data\"\n                [textField]=\"textField\"\n                [valueField]=\"valueField\"\n                [template]=\"itemTemplate\"\n                [height]=\"height\"\n                [show]=\"popupOpen\"\n                >\n            </kendo-list>\n            <!--no-data template-->\n            <div class=\"k-nodata\" *ngIf=\"data.length === 0\">\n                <template [ngIf]=\"noDataTemplate\"\n                    [templateContext]=\"{\n                        templateRef: noDataTemplate ? noDataTemplate.templateRef : undefined\n                    }\">\n                </template>\n                <template [ngIf]=\"!noDataTemplate\">\n                    <div>NO DATA FOUND.</div>\n                </template>\n            </div>\n            <!--footer template-->\n            <template *ngIf=\"footerTemplate\"\n                [templateContext]=\"{\n                    templateRef: footerTemplate.templateRef\n                }\">\n            </template>\n        </kendo-popup>\n  "
                },] },
    ];
    /** @nocollapse */
    DropDownListComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [kendo_angular_l10n_1.RTL,] },] },
        { type: selection_service_1.SelectionService, },
        { type: navigation_service_1.NavigationService, },
        { type: core_1.ElementRef, },
        { type: core_1.Renderer, },
        { type: core_1.NgZone, },
    ]; };
    DropDownListComponent.propDecorators = {
        'iconClass': [{ type: core_1.Input },],
        'loading': [{ type: core_1.Input },],
        'data': [{ type: core_1.Input },],
        'value': [{ type: core_1.Input },],
        'textField': [{ type: core_1.Input },],
        'valueField': [{ type: core_1.Input },],
        'popupSettings': [{ type: core_1.Input },],
        'defaultItem': [{ type: core_1.Input },],
        'disabled': [{ type: core_1.Input },],
        'filterable': [{ type: core_1.Input },],
        'ignoreCase': [{ type: core_1.Input },],
        'delay': [{ type: core_1.Input },],
        'valuePrimitive': [{ type: core_1.Input },],
        'tabIndex': [{ type: core_1.Input },],
        'valueChange': [{ type: core_1.Output },],
        'filterChange': [{ type: core_1.Output },],
        'selectionChange': [{ type: core_1.Output },],
        'open': [{ type: core_1.Output },],
        'close': [{ type: core_1.Output },],
        'itemTemplate': [{ type: core_1.ContentChild, args: [item_template_directive_1.ItemTemplateDirective,] },],
        'valueTemplate': [{ type: core_1.ContentChild, args: [value_template_directive_1.ValueTemplateDirective,] },],
        'headerTemplate': [{ type: core_1.ContentChild, args: [header_template_directive_1.HeaderTemplateDirective,] },],
        'footerTemplate': [{ type: core_1.ContentChild, args: [footer_template_directive_1.FooterTemplateDirective,] },],
        'noDataTemplate': [{ type: core_1.ContentChild, args: [no_data_template_directive_1.NoDataTemplateDirective,] },],
        'filterInput': [{ type: core_1.ViewChild, args: ['filterInput',] },],
        'blur': [{ type: core_1.HostListener, args: ['blur',] },],
        'focus': [{ type: core_1.HostListener, args: ['focus',] },],
        'keydown': [{ type: core_1.HostListener, args: ['keydown', ['$event'],] },],
        'keypress': [{ type: core_1.HostListener, args: ['keypress', ['$event'],] },],
        'click': [{ type: core_1.HostListener, args: ['click',] },],
        'widgetClasses': [{ type: core_1.HostBinding, args: ['class.k-widget',] }, { type: core_1.HostBinding, args: ['class.k-dropdown',] }, { type: core_1.HostBinding, args: ['class.k-header',] },],
        'role': [{ type: core_1.HostBinding, args: ['attr.role',] },],
        'widgetTabIndex': [{ type: core_1.HostBinding, args: ['attr.tabindex',] },],
        'ariaDisabled': [{ type: core_1.HostBinding, args: ['attr.aria-disabled',] },],
        'ariaHasPopup': [{ type: core_1.HostBinding, args: ['attr.aria-haspopup',] },],
        'ariaExpanded': [{ type: core_1.HostBinding, args: ['attr.aria-expanded',] },],
        'ariaOwns': [{ type: core_1.HostBinding, args: ['attr.aria-owns',] },],
        'ariaActivedescendant': [{ type: core_1.HostBinding, args: ['attr.aria-activedescendant',] },],
        'dir': [{ type: core_1.HostBinding, args: ['attr.dir',] },],
    };
    return DropDownListComponent;
}());
exports.DropDownListComponent = DropDownListComponent;
