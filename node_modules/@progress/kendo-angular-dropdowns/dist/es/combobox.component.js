/* tslint:disable:no-null-keyword */
/* tslint:disable:max-line-length */
import { Component, forwardRef, ElementRef, Input, Output, EventEmitter, ContentChild, ViewChild, HostBinding, isDevMode, Optional, Inject } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SearchBarComponent } from './searchbar.component';
import { DropDownsUtil as Util } from '@telerik/kendo-dropdowns-common';
import { ItemTemplateDirective } from './templates/item-template.directive';
import { HeaderTemplateDirective } from './templates/header-template.directive';
import { FooterTemplateDirective } from './templates/footer-template.directive';
import { NoDataTemplateDirective } from './templates/no-data-template.directive';
import { SelectionService } from './selection.service';
import { NavigationService } from './navigation.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/partition';
import 'rxjs/add/operator/throttleTime';
import { Subject } from 'rxjs/Subject';
import { isPresent, isChanged, guid, isDocumentAvailable, getter } from './util';
import { NavigationAction } from './navigation-action';
import { Keys } from './common/keys';
import { PreventableEvent } from './common/preventable-event';
import { RTL } from '@progress/kendo-angular-l10n';
/**
 * @hidden
 */
export var COMBOBOX_VALUE_ACCESSOR = {
    multi: true,
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return ComboBoxComponent; })
};
/**
 * Represents the Kendo UI ComboBox component for Angular.
 *
 * @example
 * ```ts
 * @@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-combobox [data]="listItems">
 *  </kendo-combobox>
 * `
 * })
 * class AppComponent {
 *   public listItems: Array<string> = ["Item 1", "Item 2", "Item 3", "Item 4"];
 * }
 * ```
 */
export var ComboBoxComponent = (function () {
    function ComboBoxComponent(rtl, selectionService, navigationService, wrapper) {
        this.selectionService = selectionService;
        this.navigationService = navigationService;
        this.selected = [];
        /**
         * Specifies whether the ComboBox allows user-defined values that are not present in the dataset.
         * The default value is `false`.
         *
         * For more information, refer to the section on [custom values]({% slug overview_combobox_kendouiforangular %}#toc-allow-for-custom-values).
         */
        this.allowCustom = false;
        /**
         * A user-defined callback returning normalized custom values. Typically used when the data items are not of type `string`.
         * @param { Any } value - The custom value defined by the user.
         * @returns { Any }
         *
         * @example
         * ```ts
         * @@Component({
         * selector: 'my-app',
         * template: `
         *   <kendo-combobox
         *       [allowCustom]="true"
         *       [data]="listItems"
         *       [textField]="'text'"
         *       [valueField]="'value'"
         *       [valueNormalizer]="valueNormalizer"
         *       (valueChange)="onValueChange($event)"
         *   >
         *   </kendo-combobox>
         * `
         * })
         *
         * class AppComponent {
         *   public listItems: Array<{ text: string, value: number }> = [
         *       { text: "Small", value: 1 },
         *       { text: "Medium", value: 2 },
         *       { text: "Large", value: 3 }
         *   ];
         *
         *   public onValueChange(value) {
         *       console.log("valueChange : ", value);
         *   }
         *
         *   public valueNormalizer = (text: Observable<string>) => text.map((text: string) => {
         *      return { ProductID: null, ProductName: text };
         *   });
         *
         * }
         * ```
         */
        this.valueNormalizer = function (text) { return text.map(function (userInput) { return userInput; }); };
        /**
         * The hint displayed when the component is empty.
         *
         */
        this.placeholder = "";
        /**
         * @hidden
         *
         * Enables the auto-completion of the text based on the first data item.
         */
        this.suggest = false;
        /**
         * Unless this options is set to `false`, a button will appear when hovering over the component. Clicking that button resets the component value to undefined and triggers the `change` event.
         */
        this.clearButton = true;
        /**
         * Specifies the [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
         */
        this.tabIndex = 0;
        /**
         * Enables the filtering functionality. If set to `true`, the component emits the `filterChange` event.
         */
        this.filterable = false;
        /**
         * Fires each time the value is changed.
         *
         * For more details, refer to the section on the [`valueChange`]({% slug overview_combobox_kendouiforangular %}#toc-on-value-change) event.
         */
        this.valueChange = new EventEmitter();
        /**
         * Fires each time an item selection is changed.
         *
         * For more details, refer to the section on the [`selectionChange`]({% slug overview_combobox_kendouiforangular %}#toc-on-change-of-item-selection) event.
         */
        this.selectionChange = new EventEmitter();
        /**
         * Fires each time the user types in the input.
         * You can filter the source based on the passed filtration value.
         *
         * For more details, refer to the section on the [`filterChange`]({% slug overview_combobox_kendouiforangular %}#toc-on-filter-change) event.
         */
        this.filterChange = new EventEmitter();
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
        this.isFocused = false;
        this.listBoxId = guid();
        this.optionPrefix = guid();
        this.onChangeCallback = function (_) { };
        this.onTouchedCallback = function (_) { };
        this._text = "";
        this._open = false;
        this._previousValue = undefined;
        this.suggestedText = undefined;
        this._popupSettings = { height: 200, animate: true };
        this.direction = rtl ? 'rtl' : 'ltr';
        this.wrapper = wrapper.nativeElement;
        this.data = [];
        this.customValueSubject = new Subject();
        this.valueSubject = new Subject();
        this.subscribeEvents();
    }
    Object.defineProperty(ComboBoxComponent.prototype, "width", {
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
    Object.defineProperty(ComboBoxComponent.prototype, "height", {
        get: function () {
            return this.popupSettings.height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboBoxComponent.prototype, "text", {
        get: function () {
            return this._text;
        },
        set: function (text) {
            this._text = isPresent(text) ? text : "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboBoxComponent.prototype, "popupOpen", {
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
    Object.defineProperty(ComboBoxComponent.prototype, "data", {
        get: function () {
            return this._data;
        },
        /**
         * Sets the data of the ComboBox.
         *
         * > The data has to be provided in an array-like list.
         */
        set: function (data) {
            this._data = data || [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboBoxComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        /**
         * Sets the value of the ComboBox. It can either be of the primitive (string, numbers) or of the complex (objects) type. To define the type, use the `valuePrimitive` option.
         *
         * > Selected values that are not present in the dataset are considered custom values. Unless `allowCustom` is set to `true`, custom values are dismissed when "enter" key is pressed or after the component looses focus.
         */
        set: function (newValue) {
            this.verifySettings(newValue);
            this._value = newValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboBoxComponent.prototype, "popupSettings", {
        get: function () {
            return this._popupSettings;
        },
        /**
         * Configures the popup of the ComboBox.
         *
         * The available options are:
         * - `animation: Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
         * - `width: Number | String`&mdash;Sets the width of the popup container. By default, the width of the host element is used  If set to `auto`, the component automatically adjusts the width of the popup, so no item labels are wrapped.
         * - `height: Number`&mdash;Sets the height of the popup container. By default, the height is 200px.
         * - `popupClass: String`&mdash;Specifies a list of CSS classes that are used to style the popup.
         */
        set: function (settings) {
            this._popupSettings = Object.assign({ height: 200, animate: true }, settings);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboBoxComponent.prototype, "widgetClasses", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboBoxComponent.prototype, "clearable", {
        get: function () {
            return this.clearButton;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboBoxComponent.prototype, "widgetHeight", {
        get: function () {
            return this.popupSettings.height + "px";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboBoxComponent.prototype, "role", {
        get: function () {
            return "listbox";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboBoxComponent.prototype, "widgetTabIndex", {
        get: function () {
            return this.disabled ? undefined : this.tabIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboBoxComponent.prototype, "ariaDisabled", {
        get: function () {
            return this.disabled ? true : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboBoxComponent.prototype, "ariaHasPopup", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboBoxComponent.prototype, "ariaExpanded", {
        get: function () {
            return this.popupOpen;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboBoxComponent.prototype, "ariaOwns", {
        get: function () {
            return this.listBoxId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboBoxComponent.prototype, "ariaActivedescendant", {
        get: function () {
            return this.optionPrefix + "-" + this.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboBoxComponent.prototype, "dir", {
        get: function () {
            return this.direction;
        },
        enumerable: true,
        configurable: true
    });
    ComboBoxComponent.prototype.ngOnInit = function () {
        this.createValueStream();
    };
    ComboBoxComponent.prototype.createValueStream = function () {
        var _this = this;
        var valueStream = this.valueSubject
            .filter(function (candidate) {
            var current = _this.valuePrimitive ? _this.value : getter(_this.value, _this.valueField);
            var newValue = getter(candidate, _this.valueField);
            var newText = getter(candidate, _this.textField);
            if (current === newValue && _this.text === newText) {
                return false;
            }
            else {
                return true;
            }
        })
            .map(function (candidate) {
            var newValue = getter(candidate, _this.valueField);
            var newText = getter(candidate, _this.textField);
            return {
                dataItem: candidate,
                text: newText,
                value: _this.value = _this.valuePrimitive ? newValue : candidate
            };
        });
        var customValueStreams = this.customValueSubject.throttleTime(300).partition(function () { return _this.allowCustom; });
        var allowCustomValueStream = customValueStreams[0]
            .do(function () {
            _this.loading = true;
            _this.disabled = true;
        })
            .filter(function () {
            var hasChange = _this.text !== getter(_this.value, _this.textField);
            _this.loading = hasChange;
            _this.disabled = hasChange;
            return hasChange;
        })
            .let(this.valueNormalizer)
            .map(function (normalizedValue) {
            return {
                dataItem: undefined,
                text: _this.text,
                value: normalizedValue
            };
        });
        var disableCustomValueStream = customValueStreams[1]
            .map(function () {
            return {
                dataItem: undefined,
                text: undefined,
                value: undefined
            };
        });
        if (this.valueSubscription) {
            this.valueSubscription.unsubscribe();
        }
        var merged = valueStream.merge(allowCustomValueStream, disableCustomValueStream);
        this.valueSubscription = merged
            .catch(function () {
            _this.dataItem = undefined;
            _this.value = undefined;
            _this.text = undefined;
            _this.loading = false;
            _this.disabled = false;
            _this.emitChange();
            return merged;
        })
            .subscribe(function (state) {
            _this.dataItem = state.dataItem;
            _this.value = state.value;
            _this.text = state.text;
            _this.loading = false;
            _this.disabled = false;
            _this.emitChange();
        });
    };
    ComboBoxComponent.prototype.subscribeEvents = function () {
        var _this = this;
        if (!isDocumentAvailable()) {
            return;
        }
        this.changeSubscribtion = this.selectionService.onChange.subscribe(this.handleItemChange.bind(this));
        this.selectSubscribtion = this.selectionService.onSelect.subscribe(this.handleItemSelect.bind(this));
        this.navigationSubscribtion = Observable.merge(this.navigationService.up, this.navigationService.down, this.navigationService.home, this.navigationService.end).subscribe(function (index) { return _this.navigate(index); });
        this.openSubscribtion = this.navigationService.open.subscribe(function () { return _this.popupOpen = true; });
        this.closeSubscription = this.navigationService.close.subscribe(function () { return _this.popupOpen = false; });
        this.enterSubscription = this.navigationService.enter.subscribe(this.handleEnter.bind(this));
        this.escSubscription = this.navigationService.esc.subscribe(this.handleBlur.bind(this));
    };
    ComboBoxComponent.prototype.unsubscribeEvents = function () {
        if (!isDocumentAvailable()) {
            return;
        }
        this.changeSubscribtion.unsubscribe();
        this.selectSubscribtion.unsubscribe();
        this.navigationSubscribtion.unsubscribe();
        this.openSubscribtion.unsubscribe();
        this.closeSubscription.unsubscribe();
        this.enterSubscription.unsubscribe();
        this.escSubscription.unsubscribe();
        if (this.valueSubscription) {
            this.valueSubscription.unsubscribe();
        }
    };
    ComboBoxComponent.prototype.handleItemChange = function (event) {
        var index = event.indices.length ? event.indices[0] : undefined;
        if (!isPresent(index)) {
            return;
        }
        this.change(this.data[index]);
    };
    ComboBoxComponent.prototype.handleItemSelect = function (event) {
        var index = event.indices.length ? event.indices[0] : undefined;
        if (!isPresent(index)) {
            return;
        }
        if (!this.popupOpen) {
            this.change(this.data[index]);
        }
        else {
            this.selectionChange.emit(this.data[index]);
        }
    };
    ComboBoxComponent.prototype.ngOnDestroy = function () {
        this.unsubscribeEvents();
    };
    ComboBoxComponent.prototype.ngOnChanges = function (changes) {
        if (isChanged("valueNormalizer", changes)) {
            this.createValueStream();
        }
        if (this.valuePrimitive === undefined) {
            this.valuePrimitive = this.valueField ? false : true;
        }
        this.setState(this.value);
        if (this.suggest && this.data && this.data.length && this.text) {
            this.suggestedText = getter(this.data[0], this.textField);
        }
    };
    /**
     * Toggles the visibility of the popup. If you use the `toggle` method to open or close the popup, the `open` and `close` events will not be fired.
     *
     * @param open - The state of the popup.
     */
    ComboBoxComponent.prototype.toggle = function (open) {
        this._open = (open === undefined) ? !this._open : open;
        if (this._open) {
            this.popupWidth = this.width.max;
            this.popupMinWidth = this.width.min;
        }
    };
    Object.defineProperty(ComboBoxComponent.prototype, "isOpen", {
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
    ComboBoxComponent.prototype.clearValue = function (event) {
        event.stopImmediatePropagation();
        this.change(undefined);
        this.selectionService.resetSelection([]);
    };
    /**
     * @hidden
     */
    ComboBoxComponent.prototype.writeValue = function (value) {
        this.text = "";
        this.setState(value);
    };
    /**
     * @hidden
     */
    ComboBoxComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @hidden
     */
    ComboBoxComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @hidden
     */
    ComboBoxComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    ComboBoxComponent.prototype.verifySettings = function (newValue) {
        var valueOrText = !isPresent(this.valueField) !== !isPresent(this.textField);
        if (!isDevMode()) {
            return;
        }
        if (this.valuePrimitive === true && isPresent(newValue) && typeof newValue === "object") {
            throw new Error("Expected initial value of primitive type. See http://www.telerik.com/kendo-angular-ui/components/dropdowns/combobox/#toc-value-selection");
        }
        if (this.valuePrimitive === false && isPresent(newValue) && typeof newValue !== "object") {
            throw new Error("Expected initial value of type Object. See http://www.telerik.com/kendo-angular-ui/components/dropdowns/combobox/#toc-value-selection");
        }
        if (valueOrText) {
            throw new Error("Expected textField and valueField options to be set. See http://www.telerik.com/kendo-angular-ui/components/dropdowns/combobox/#toc-bind-to-arrays-of-complex-data");
        }
    };
    ComboBoxComponent.prototype.setState = function (value) {
        var newValue = isPresent(getter(value, this.valueField)) ? getter(value, this.valueField) : value;
        var valueCandidate;
        var textCandidate;
        var dataItemCandidate;
        var filterState = this.filterable && !!this.text;
        if (!this.data.length) {
            if (filterState) {
                this.selectionService.resetSelection([-1]);
                return;
            }
            valueCandidate = value;
            textCandidate = getter(value, this.textField);
            dataItemCandidate = this.valueField && !this.valuePrimitive ? value : undefined;
        }
        else {
            var result = Util.resolveValue({
                data: this.data,
                value: newValue,
                valueField: this.valueField
            });
            valueCandidate = this.valuePrimitive ? newValue : value;
            if (result.dataItem) {
                this.selectionService.resetSelection(result.selected);
                textCandidate = getter(result.dataItem, this.textField);
                dataItemCandidate = result.dataItem;
            }
            else {
                this.selectionService.resetSelection([]);
                this.selectionService.focused = 0;
                if (filterState) {
                    textCandidate = this.text;
                }
                else {
                    textCandidate = this.valueField ? getter(value, this.textField) : value;
                }
                dataItemCandidate = !this.valuePrimitive ? value : undefined;
            }
        }
        this.value = valueCandidate;
        this.text = textCandidate;
        this.dataItem = dataItemCandidate;
        this._previousValue = valueCandidate;
    };
    ComboBoxComponent.prototype.search = function (text) {
        var _this = this;
        var index = this.data.findIndex(function (item) {
            var itemText = getter(item, _this.textField);
            itemText = itemText === undefined ? "" : itemText.toString().toLowerCase();
            return itemText.startsWith(text.toLowerCase());
        });
        this.selectionService.focused = index;
        this.suggestedText = getter(this.data[index], this.textField);
    };
    /**
     * @hidden
     */
    ComboBoxComponent.prototype.getSuggestion = function () {
        var hasSelected = !!this.selectionService.selected.length;
        var shouldSuggest = this.suggest && !this.backspacePressed && this.suggestedText && this.text;
        if (!hasSelected && shouldSuggest && this.suggestedText.toLowerCase().startsWith(this.text.toLowerCase())) {
            return this.suggestedText;
        }
        else {
            this.suggestedText = undefined;
        }
    };
    ComboBoxComponent.prototype.navigate = function (index) {
        this.text = getter(this.data[index], this.textField);
        this.selectionService.select(index);
    };
    /**
     * @hidden
     */
    ComboBoxComponent.prototype.handleNavigate = function (event) {
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
        var action = this.navigationService.process({
            altKey: event.altKey,
            current: focused + offset,
            keyCode: event.keyCode,
            max: this.data.length - 1,
            min: 0
        });
        if (action !== NavigationAction.Undefined,
            action !== NavigationAction.Left &&
                action !== NavigationAction.Right &&
                action !== NavigationAction.Backspace &&
                action !== NavigationAction.Delete &&
                (action !== NavigationAction.Enter || (action === NavigationAction.Enter && this.popupOpen))) {
            event.preventDefault();
        }
    };
    ComboBoxComponent.prototype.handleEnter = function () {
        var focused = this.selectionService.focused;
        var isCustom = focused === -1 || focused === undefined;
        var previousText = getter(this._previousValue, this.textField) || "";
        var hasChange = this.text !== previousText;
        if (!isCustom && this.popupOpen) {
            this.selectionService.select(focused);
            this.change(this.data[focused] || this.text, isCustom);
            return;
        }
        if (hasChange) {
            this.change(this.text, isCustom);
        }
        else {
            this.popupOpen = false;
            this.isFocused = false;
        }
    };
    /**
     * @hidden
     */
    ComboBoxComponent.prototype.handleBlur = function () {
        var currentText = this.searchbar.value; //value is updated, but Angular's change is not yet emitted
        if (!currentText && !isPresent(this._previousValue)) {
            this.popupOpen = false;
            this.isFocused = false;
            return;
        }
        var focused = this.selectionService.focused;
        var dataItem;
        var text;
        if (focused !== -1) {
            dataItem = this.data[focused];
            text = getter(dataItem, this.textField) || "";
        }
        if (text && text.toLowerCase() === currentText.toLowerCase()) {
            this.selectionService.change(focused);
        }
        else {
            this.change(currentText, true);
        }
        this.popupOpen = false;
        this.isFocused = false;
    };
    /**
     * @hidden
     */
    ComboBoxComponent.prototype.searchBarChange = function (text) {
        var currentTextLength = this.text ? this.text.length : 0;
        this.backspacePressed = (text.length < currentTextLength) ? true : false;
        this.text = text;
        //Reset the selection prior filter. It will be resolved if there is a match and we don't need it if there isn't one
        this.selectionService.resetSelection([]);
        this.popupOpen = true;
        if (this.filterable) {
            this.filterChange.emit(text);
        }
        else {
            this.search(text);
        }
    };
    /**
     * @hidden
     */
    ComboBoxComponent.prototype.handleFocus = function () {
        this.isFocused = true;
    };
    ComboBoxComponent.prototype.change = function (candidate, isCustom) {
        if (isCustom === void 0) { isCustom = false; }
        this.popupOpen = false;
        if (isCustom) {
            this.customValueSubject.next(candidate);
        }
        else {
            this.valueSubject.next(candidate);
        }
    };
    ComboBoxComponent.prototype.emitChange = function () {
        this._previousValue = this.value;
        this.selectionChange.emit(this.value);
        this.onChangeCallback(this.value);
        this.valueChange.emit(this.value);
    };
    /**
     * @hidden
     */
    ComboBoxComponent.prototype.iconClick = function () {
        this.searchbar.focus();
        this.popupOpen = !this.popupOpen;
    };
    Object.defineProperty(ComboBoxComponent.prototype, "listContainerClasses", {
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
    ComboBoxComponent.decorators = [
        { type: Component, args: [{
                    exportAs: 'kendoComboBox',
                    providers: [COMBOBOX_VALUE_ACCESSOR, SelectionService, NavigationService],
                    selector: 'kendo-combobox',
                    template: "\n        <span #anchor unselectable=\"on\"\n          [ngClass]=\"{\n            'k-dropdown-wrap': true,\n            'k-state-default': !this.disabled,\n            'k-state-disabled': this.disabled,\n            'k-state-focused': this.isFocused\n          }\" >\n          <kendo-searchbar #searchbar\n              [userInput]=\"text\"\n              [suggestedText]=\"getSuggestion()\"\n              [disabled]=\"disabled\"\n              [placeholder]=\"placeholder\"\n              (onNavigate)=\"handleNavigate($event)\"\n              (valueChange)=\"searchBarChange($event)\"\n              (onBlur)=\"handleBlur()\"\n              (onFocus)=\"handleFocus()\"\n          ></kendo-searchbar>\n          <span *ngIf=\"!loading && (clearButton && text?.length)\" class=\"k-icon k-clear-value k-i-close\" title=\"clear\" role=\"button\" tabindex=\"-1\" (click)=\"clearValue($event)\"></span>\n          <span *ngIf=\"loading\" class=\"k-icon k-i-loading\"></span>\n          <span unselectable=\"on\"\n              [ngClass]=\"{ 'k-select': true }\"\n              (click)=\"iconClick()\"\n              (mousedown)=\"$event.preventDefault()\" >\n              <span [ngClass]=\"{\n                  'k-icon': true,\n                  'k-i-arrow-s': true\n              }\"></span>\n          </span>\n        </span>\n        <kendo-popup *ngIf=\"popupOpen\"\n            [anchor]=\"anchor\"\n            [animate]=\"popupSettings.animate\"\n            [popupClass]=\"listContainerClasses\"\n            [style.width]=\"popupWidth\"\n            [style.minWidth]=\"popupMinWidth\"\n            (anchorViewportLeave)=\"popupOpen=false\"\n            (mousedown)=\"$event.preventDefault()\">\n            <!--header template-->\n            <template *ngIf=\"headerTemplate\"\n                [templateContext]=\"{\n                    templateRef: headerTemplate.templateRef\n                }\">\n            </template>\n            <!--list-->\n            <kendo-list\n                [id]=\"listBoxId\"\n                [optionPrefix]=\"optionPrefix\"\n                [data]=\"data\"\n                [textField]=\"textField\"\n                [valueField]=\"valueField\"\n                [template]=\"template\"\n                [height]=\"height\"\n                [show]=\"popupOpen\"\n            >\n            </kendo-list>\n            <!--no-data template-->\n            <div class=\"k-nodata\" *ngIf=\"data.length === 0\">\n                <template [ngIf]=\"noDataTemplate\"\n                    [templateContext]=\"{\n                        templateRef: noDataTemplate ? noDataTemplate.templateRef : undefined\n                    }\">\n                </template>\n                <template [ngIf]=\"!noDataTemplate\">\n                    <div>NO DATA FOUND.</div>\n                </template>\n            </div>\n            <!--footer template-->\n            <template *ngIf=\"footerTemplate\"\n                [templateContext]=\"{\n                    templateRef: footerTemplate.templateRef\n                }\">\n            </template>\n        </kendo-popup>\n  "
                },] },
    ];
    /** @nocollapse */
    ComboBoxComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [RTL,] },] },
        { type: SelectionService, },
        { type: NavigationService, },
        { type: ElementRef, },
    ]; };
    ComboBoxComponent.propDecorators = {
        'allowCustom': [{ type: Input },],
        'data': [{ type: Input },],
        'value': [{ type: Input },],
        'textField': [{ type: Input },],
        'valueField': [{ type: Input },],
        'valuePrimitive': [{ type: Input },],
        'valueNormalizer': [{ type: Input },],
        'placeholder': [{ type: Input },],
        'popupSettings': [{ type: Input },],
        'loading': [{ type: Input },],
        'suggest': [{ type: Input },],
        'clearButton': [{ type: Input },],
        'disabled': [{ type: Input },],
        'tabIndex': [{ type: Input },],
        'filterable': [{ type: Input },],
        'valueChange': [{ type: Output },],
        'selectionChange': [{ type: Output },],
        'filterChange': [{ type: Output },],
        'open': [{ type: Output },],
        'close': [{ type: Output },],
        'template': [{ type: ContentChild, args: [ItemTemplateDirective,] },],
        'headerTemplate': [{ type: ContentChild, args: [HeaderTemplateDirective,] },],
        'footerTemplate': [{ type: ContentChild, args: [FooterTemplateDirective,] },],
        'noDataTemplate': [{ type: ContentChild, args: [NoDataTemplateDirective,] },],
        'searchbar': [{ type: ViewChild, args: [SearchBarComponent,] },],
        'widgetClasses': [{ type: HostBinding, args: ['class.k-widget',] }, { type: HostBinding, args: ['class.k-combobox',] }, { type: HostBinding, args: ['class.k-header',] },],
        'clearable': [{ type: HostBinding, args: ['class.k-combobox-clearable',] },],
        'widgetHeight': [{ type: HostBinding, args: ['style.max-height',] },],
        'role': [{ type: HostBinding, args: ['attr.role',] },],
        'widgetTabIndex': [{ type: HostBinding, args: ['attr.tabindex',] },],
        'ariaDisabled': [{ type: HostBinding, args: ['attr.aria-disabled',] },],
        'ariaHasPopup': [{ type: HostBinding, args: ['attr.aria-haspopup',] },],
        'ariaExpanded': [{ type: HostBinding, args: ['attr.aria-expanded',] },],
        'ariaOwns': [{ type: HostBinding, args: ['attr.aria-owns',] },],
        'ariaActivedescendant': [{ type: HostBinding, args: ['attr.aria-activedescendant',] },],
        'dir': [{ type: HostBinding, args: ['attr.dir',] },],
    };
    return ComboBoxComponent;
}());
