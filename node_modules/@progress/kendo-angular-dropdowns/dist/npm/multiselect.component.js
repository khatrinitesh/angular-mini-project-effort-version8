"use strict";
/* tslint:disable:max-line-length */
var util_1 = require('./util');
var searchbar_component_1 = require('./searchbar.component');
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var selection_service_1 = require('./selection.service');
var navigation_service_1 = require('./navigation.service');
var navigation_action_1 = require('./navigation-action');
var keys_1 = require('./common/keys');
var item_template_directive_1 = require('./templates/item-template.directive');
var header_template_directive_1 = require('./templates/header-template.directive');
var footer_template_directive_1 = require('./templates/footer-template.directive');
var tag_template_directive_1 = require('./templates/tag-template.directive');
var no_data_template_directive_1 = require('./templates/no-data-template.directive');
var error_messages_1 = require('./error-messages');
var preventable_event_1 = require('./common/preventable-event');
var kendo_angular_l10n_1 = require('@progress/kendo-angular-l10n');
var MULTISELECT_VALUE_ACCESSOR = {
    multi: true,
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return MultiSelectComponent; })
};
/**
 * Represents the Kendo UI MultiSelect component for Angular.
 *
 * @example
 * ```ts
 * @@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-multiselect [data]="listItems">
 *  </kendo-multiselect>
 * `
 * })
 * class AppComponent {
 *   public listItems: Array<string> = ["Item 1", "Item 2", "Item 3", "Item 4"];
 * }
 * ```
 */
var MultiSelectComponent = (function () {
    function MultiSelectComponent(rtl, selectionService, renderer, navigationService, wrapper) {
        this.selectionService = selectionService;
        this.renderer = renderer;
        this.navigationService = navigationService;
        this.activeId = util_1.guid();
        this.listBoxId = util_1.guid();
        this.focusedTagIndex = undefined;
        /**
         * Specifies the [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
         */
        this.tabIndex = 0;
        /**
         * Sets the disabled state of the component.
         */
        this.disabled = false;
        /**
         * Enables the [filtering]({% slug overview_multiselect_kendouiforangular %}#toc-filtering) functionality of the MultiSelect.
         */
        this.filterable = false;
        /**
         * Unless this options is set to `false`, a button will appear when hovering over the component. Clicking that button resets the component value to an empty array and triggers the `change` event.
         */
        this.clearButton = true;
        /**
         * Fires each time the user types in the filter input. You can filter the source based on the passed filtration value.
         */
        this.filterChange = new core_1.EventEmitter();
        /**
         * Fires each time the value is changed.
         *
         * For more details, refer to the section on the [`valueChange`]({% slug overview_multiselect_kendouiforangular %}#toc-on-value-change) event.
         */
        this.valueChange = new core_1.EventEmitter();
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
        this.onChangeCallback = function (_) { };
        this.onTouchedCallback = function (_) { };
        this._data = [];
        this._placeholder = '';
        this._open = false;
        this._value = [];
        this.selectedDataItems = [];
        this._popupSettings = { height: 200, animate: true };
        this.isFocused = false;
        this.direction = rtl ? 'rtl' : 'ltr';
        this.wrapper = wrapper.nativeElement;
        this.subscribeEvents();
    }
    Object.defineProperty(MultiSelectComponent.prototype, "popupOpen", {
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
    Object.defineProperty(MultiSelectComponent.prototype, "data", {
        get: function () {
            return this._data;
        },
        /**
         * Sets the data of the MultiSelect.
         *
         * > The data has to be provided in an array of items.
         */
        set: function (data) {
            this._data = data || [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        /**
         * Sets the value of the MultiSelect. It could be either of the primitive (string, numbers) or of the complex (objects) type. Use the `valuePrimitive` option to define the type.
         *
         * > Selected values that are not present in the source are ignored.
         */
        set: function (values) {
            this._value = values ? values : [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "placeholder", {
        get: function () {
            return this.selectedDataItems.length ? '' : this._placeholder;
        },
        /**
         * The hint displayed when the component is empty. Will not be displayed when values are selected.
         */
        set: function (text) {
            this._placeholder = text || '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "popupSettings", {
        get: function () {
            return this._popupSettings;
        },
        /**
         * Configures the popup of the MultiSelect.
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
    Object.defineProperty(MultiSelectComponent.prototype, "getTabIndex", {
        get: function () {
            return this.disabled ? undefined : this.tabIndex;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.focus = function () {
        this.isFocused = true;
        this.searchbar.focus();
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.blur = function () {
        this.isFocused = false;
        this.onTouchedCallback();
    };
    Object.defineProperty(MultiSelectComponent.prototype, "widgetClasses", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "focusedClass", {
        get: function () {
            return this.isFocused;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "disabledClass", {
        get: function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MultiSelectComponent.prototype, "dir", {
        get: function () {
            return this.direction;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.click = function () {
        this.searchbar.focus();
        this.popupOpen = !this.popupOpen;
        if (!this.popupOpen) {
            this.renderer.invokeElementMethod(this.wrapper, "focus");
        }
    };
    Object.defineProperty(MultiSelectComponent.prototype, "listContainerClasses", {
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
    Object.defineProperty(MultiSelectComponent.prototype, "width", {
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
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.popupOpened = function () {
        this.popupWidth = this.width.max;
        this.popupMinWidth = this.width.min;
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.onMouseDown = function (event) {
        var tagName = event.target.tagName.toLowerCase();
        if (tagName !== "input") {
            event.preventDefault();
        }
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.verifySettings = function () {
        var valueOrText = !util_1.isPresent(this.valueField) !== !util_1.isPresent(this.textField);
        if (!core_1.isDevMode() || this.value.length === 0) {
            return;
        }
        if (!util_1.isArray(this.value)) {
            throw new Error(error_messages_1.MultiselectMessages.array);
        }
        if (this.valuePrimitive === true && util_1.isObjectArray(this.value)) {
            throw new Error(error_messages_1.MultiselectMessages.primitive);
        }
        if (this.valuePrimitive === false && !util_1.isObjectArray(this.value)) {
            throw new Error(error_messages_1.MultiselectMessages.object);
        }
        if (valueOrText) {
            throw new Error("Expected textField and valueField options to be set. See http://www.telerik.com/kendo-angular-ui/components/dropdowns/multiselect/#toc-bind-to-arrays-of-complex-data");
        }
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.change = function (event) {
        var _this = this;
        if (util_1.isPresent(event.added)) {
            var dataItem = this.data[event.added];
            var newItem = this.valuePrimitive ? dataItem[this.valueField] || dataItem :
                dataItem;
            this.value = this.value.concat([newItem]);
        }
        if (util_1.isPresent(event.removed)) {
            var dataItem_1 = this.data[event.removed];
            if (this.valuePrimitive) {
                var index = this.value.indexOf(dataItem_1[this.valueField] || dataItem_1);
                this.value.splice(index, 1);
            }
            else {
                this.value = this.value.filter(function (item) { return item[_this.valueField] !== dataItem_1[_this.valueField]; });
            }
        }
        this.emitValueChange();
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.setState = function (value) {
        var objectArray = util_1.isObjectArray(value);
        var selection = util_1.selectedIndices(this.value, this.data, this.valueField);
        this.selectionService.resetSelection(selection);
        if (this.popupOpen && this.selectionService.focused === undefined && this.data.length) {
            this.selectionService.focused = 0;
        }
        if (this.selectedDataItems.length <= 0) {
            if (this.valuePrimitive && !this.valueField) {
                this.selectedDataItems = value.slice();
            }
            if (objectArray || this.valuePrimitive && this.valueField) {
                this.selectedDataItems = util_1.resolveAllValues(value, this.data, this.valueField);
            }
        }
        this.tags = this.selectedDataItems;
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.handleBlur = function () {
        this.closePopup();
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.handleFilter = function (text) {
        this.text = text;
        this.searchbar.resizeInput(this.text.length);
        if (this.filterable) {
            this.filterChange.emit(text);
        }
        else {
            this.search(text);
        }
        this.openPopup();
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.handleNavigate = function (event) {
        var navigateInput = this.text && event.keyCode !== keys_1.Keys.down && event.keyCode !== keys_1.Keys.up;
        var selectValue = this.text && event.keyCode === keys_1.Keys.enter || event.keyCode === keys_1.Keys.esc;
        var deleteTag = !this.text && event.keyCode === keys_1.Keys.backspace && this.tags.length > 0;
        if (deleteTag) {
            this.handleBackspace();
            return;
        }
        if (this.disabled || navigateInput && !selectValue) {
            return;
        }
        var eventData = event;
        var focused = isNaN(this.selectionService.focused) ? -1 : this.selectionService.focused;
        var action = this.navigationService.process({
            altKey: eventData.altKey,
            current: focused,
            keyCode: eventData.keyCode,
            max: this.data.length - 1,
            min: 0,
            open: this.popupOpen
        });
        if (action !== navigation_action_1.NavigationAction.Undefined
            && (action !== navigation_action_1.NavigationAction.Enter || (action === navigation_action_1.NavigationAction.Enter && this.popupOpen))) {
            event.preventDefault();
        }
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.removeTag = function (dataItem) {
        var _this = this;
        var index = util_1.selectedIndices([dataItem], this.data, this.valueField)[0];
        if (util_1.isNumber(index)) {
            this.selectionService.unselect(index);
            this.popupOpen = false;
        }
        else {
            var filter = function (item) { return item[_this.valueField] !== dataItem[_this.valueField]; };
            this.value = this.value.filter(filter);
            this.tags = this.selectedDataItems = this.selectedDataItems.filter(filter);
            this.emitValueChange();
        }
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.clearAll = function (event) {
        event.stopImmediatePropagation();
        this.value = [];
        this.selectedDataItems = [];
        this.emitValueChange();
        this.setState([]);
    };
    MultiSelectComponent.prototype.ngAfterContentChecked = function () {
        this.verifySettings();
    };
    MultiSelectComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (this.valuePrimitive === undefined) {
            this.valuePrimitive = !this.valueField;
        }
        if (changes.value && this.selectedDataItems.length > 0) {
            //peristed selected data items when list is filtered
            this.selectedDataItems = this.selectedDataItems.concat(this.data).filter(function (curr) {
                return changes.value.currentValue.find(function (item) { return item[_this.valueField] === curr; });
            }).filter(function (dataItem) { return !!dataItem; }); //filter undefined values
        }
        this.setState(this.value);
    };
    MultiSelectComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.searchbar.resizeInput(Math.max(1, this.placeholder.length));
        this.observableSubscriptions.add(this.searchbar.onFocus.subscribe(function () { return _this.isFocused = true; }));
        this.observableSubscriptions.add(this.searchbar.onBlur.subscribe(function () { return _this.isFocused = false; }));
    };
    MultiSelectComponent.prototype.ngOnDestroy = function () {
        this.unsubscribeEvents();
    };
    /**
     * Toggles the visibility of the popup. If you use the `toggle` method to open or close the popup, the `open` and `close` events will not be fired.
     *
     * @param open - The state of the popup.
     */
    MultiSelectComponent.prototype.toggle = function (open) {
        this._open = (open === undefined) ? !this._open : open;
        if (this._open) {
            this.popupWidth = this.width.max;
            this.popupMinWidth = this.width.min;
        }
    };
    Object.defineProperty(MultiSelectComponent.prototype, "isOpen", {
        /**
         * Returns the current open state of the popup.
         */
        get: function () {
            return this.popupOpen;
        },
        enumerable: true,
        configurable: true
    });
    //NG MODEL BINDINGS
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.writeValue = function (value) {
        if (value === null)
            return; /* tslint:disable-line */
        this.value = value;
        this.selectedDataItems = [];
        this.setState(this.value);
        this.verifySettings();
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @hidden
     */
    MultiSelectComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    MultiSelectComponent.prototype.subscribeEvents = function () {
        var _this = this;
        if (!util_1.isDocumentAvailable()) {
            return;
        }
        this.observableSubscriptions = this.changeSubscription = this.selectionService.onChange.subscribe(this.handleItemChange.bind(this));
        var isOpen = function () { return _this.popupOpen; };
        var isClosed = function () { return !_this.popupOpen; };
        var isTagFocused = function () { return !_this.popupOpen && _this.focusedTagIndex !== undefined; };
        [
            this.navigationService.esc.subscribe(this.closePopup.bind(this)),
            this.navigationService.enter.filter(isOpen).subscribe(this.handleEnter.bind(this)),
            this.navigationService.open.subscribe(this.openPopup.bind(this)),
            this.navigationService.close.subscribe(this.handleClose.bind(this)),
            this.navigationService.up.filter(isOpen).subscribe(this.handleUp.bind(this)),
            this.navigationService.home.filter(isClosed).subscribe(this.handleHome.bind(this)),
            this.navigationService.end.filter(isClosed).subscribe(this.handleEnd.bind(this)),
            this.navigationService.backspace.filter(isTagFocused).subscribe(this.handleBackspace.bind(this)),
            this.navigationService.delete.filter(isTagFocused).subscribe(this.handleDelete.bind(this)),
            this.navigationService.left.subscribe(this.handleLeftKey.bind(this)),
            this.navigationService.right.subscribe(this.handleRightKey.bind(this)),
            this.navigationService.down.subscribe(this.handleDownKey.bind(this))
        ].forEach(function (s) { return _this.observableSubscriptions.add(s); });
    };
    MultiSelectComponent.prototype.unsubscribeEvents = function () {
        if (!util_1.isDocumentAvailable()) {
            return;
        }
        this.observableSubscriptions.unsubscribe();
    };
    MultiSelectComponent.prototype.handleItemChange = function (event) {
        if (util_1.isPresent(event.added)) {
            this.addItem(event.added);
        }
        else if (util_1.isPresent(event.removed)) {
            this.removeItem(event.removed);
        }
        this.change(event);
        this.popupOpen = false;
    };
    MultiSelectComponent.prototype.handleEnter = function () {
        var focusedIndex = this.selectionService.focused;
        if (focusedIndex === -1) {
            return;
        }
        if (this.selectionService.isSelected(focusedIndex)) {
            this.selectionService.unselect(focusedIndex);
        }
        else {
            this.selectionService.add(focusedIndex);
        }
        this.handleFilter('');
        this.popupOpen = false;
    };
    MultiSelectComponent.prototype.handleClose = function () {
        this.closePopup();
        this.searchbar.focus();
    };
    MultiSelectComponent.prototype.handleEnd = function () {
        this.focusedTagIndex = this.tags.length - 1;
    };
    MultiSelectComponent.prototype.handleHome = function () {
        this.focusedTagIndex = 0;
    };
    MultiSelectComponent.prototype.handleUp = function (index) {
        this.selectionService.focused = index;
    };
    MultiSelectComponent.prototype.handleBackspace = function () {
        if (this.focusedTagIndex !== undefined) {
            this.handleDelete();
            return;
        }
        this.focusedTagIndex = this.tags.length - 1;
        var dataItem = this.tags[this.focusedTagIndex];
        var tagIndex = util_1.selectedIndices([dataItem], this.data, this.valueField)[0];
        this.selectionService.unselect(tagIndex);
        this.focusedTagIndex = undefined;
        this.searchbar.focus();
    };
    MultiSelectComponent.prototype.handleDelete = function () {
        var dataItem = this.tags[this.focusedTagIndex];
        var tagIndex = util_1.selectedIndices([dataItem], this.data, this.valueField)[0];
        this.selectionService.unselect(tagIndex);
        if (this.focusedTagIndex === this.tags.length) {
            this.focusedTagIndex = undefined;
        }
    };
    MultiSelectComponent.prototype.handleLeftKey = function () {
        if (this.direction === 'rtl' && this.focusedTagIndex === 0) {
            this.focusedTagIndex = undefined;
            return;
        }
        if (this.direction === 'rtl' && this.focusedTagIndex === undefined) {
            return;
        }
        if (this.focusedTagIndex === undefined || this.focusedTagIndex < 0) {
            this.focusedTagIndex = this.tags.length - 1;
        }
        else if (this.focusedTagIndex !== 0) {
            this.focusedTagIndex--;
        }
    };
    MultiSelectComponent.prototype.handleDownKey = function (index) {
        if (this.popupOpen) {
            this.selectionService.focused = index || 0;
        }
        else {
            this.openPopup();
        }
    };
    MultiSelectComponent.prototype.handleRightKey = function () {
        var last = this.tags.length - 1;
        if (this.direction === 'rtl' && this.focusedTagIndex === undefined) {
            this.focusedTagIndex = 0;
            return;
        }
        if (this.direction === 'rtl' && this.focusedTagIndex === last) {
            return;
        }
        if (this.focusedTagIndex === last) {
            this.focusedTagIndex = undefined;
        }
        else if (this.focusedTagIndex < last) {
            this.focusedTagIndex++;
        }
    };
    MultiSelectComponent.prototype.addItem = function (index) {
        var dataItem = this.data[index];
        this.selectedDataItems.push(dataItem);
        this.handleFilter('');
    };
    MultiSelectComponent.prototype.removeItem = function (index) {
        var _this = this;
        var indexToRemove = this.selectedDataItems.findIndex(function (item) { return util_1.getter(_this.data[index], _this.valueField) === util_1.getter(item, _this.valueField); });
        this.selectedDataItems.splice(indexToRemove, 1);
    };
    MultiSelectComponent.prototype.search = function (text) {
        var _this = this;
        var index = this.data.findIndex(function (item) {
            var itemText = util_1.getter(item, _this.textField);
            itemText = itemText === undefined ? "" : itemText.toString().toLowerCase();
            return itemText.startsWith(text.toLowerCase());
        });
        this.selectionService.focused = index;
    };
    MultiSelectComponent.prototype.closePopup = function () {
        this.popupOpen = false;
        this.focusedTagIndex = undefined;
    };
    MultiSelectComponent.prototype.openPopup = function () {
        this.popupOpen = true;
        this.focusedTagIndex = undefined;
    };
    MultiSelectComponent.prototype.emitValueChange = function () {
        this.valueChange.emit(this.value);
        this.onChangeCallback(this.value);
    };
    MultiSelectComponent.decorators = [
        { type: core_1.Component, args: [{
                    exportAs: 'kendoMultiSelect',
                    providers: [MULTISELECT_VALUE_ACCESSOR, selection_service_1.SelectionService, navigation_service_1.NavigationService],
                    selector: 'kendo-multiselect',
                    template: "\n        <div\n            class=\"k-multiselect-wrap k-floatwrap\"\n            #anchor\n        >\n            <kendo-taglist\n                [tags]=\"tags\"\n                [textField]=\"textField\"\n                [focused]=\"focusedTagIndex\"\n                [disabled]=\"disabled\"\n                [template]=\"tagTemplate\"\n                [activeId]=\"activeId\"\n                (removeTag)=\"removeTag($event)\"\n            >\n            </kendo-taglist>\n            <kendo-searchbar\n                #searchbar\n                [userInput]=\"text\"\n                [disabled]=\"disabled\"\n                [placeholder]=\"placeholder\"\n                [activeId]=\"activeId\"\n                (onNavigate)=\"handleNavigate($event)\"\n                (valueChange)=\"handleFilter($event)\"\n                (onBlur)=\"handleBlur()\"\n            >\n            </kendo-searchbar>\n            <span *ngIf=\"!loading && clearButton && tags?.length\" class=\"k-icon k-clear-value k-i-close\" title=\"clear\" role=\"button\" tabindex=\"-1\" (click)=\"clearAll($event)\"></span>\n            <span *ngIf=\"loading\" class=\"k-icon k-i-loading\"></span>\n        </div>\n        <kendo-popup *ngIf=\"popupOpen\"\n            [anchor]=\"anchor\"\n            [popupClass]=\"listContainerClasses\"\n            [animate]=\"popupSettings?.animate\"\n            [style.width]=\"popupWidth\"\n            [style.minWidth]=\"popupMinWidth\"\n            (anchorViewportLeave)=\"popupOpen=false\"\n            (open)=\"popupOpened()\"\n            (mousedown)=\"onMouseDown($event)\"\n        >\n            <!--header template-->\n            <template *ngIf=\"headerTemplate\"\n                [templateContext]=\"{\n                    templateRef: headerTemplate.templateRef\n                }\">\n            </template>\n            <!--list-->\n            <kendo-list\n                [id]=\"listBoxId\"\n                [data]=\"data\"\n                [textField]=\"textField\"\n                [valueField]=\"valueField\"\n                [height]=\"popupSettings?.height\"\n                [template]=\"template\"\n                [show]=\"popupOpen\"\n                [multipleSelection]=\"true\"\n                >\n            </kendo-list>\n            <!--no data template-->\n            <div class=\"k-nodata\" *ngIf=\"data.length === 0\">\n                <template [ngIf]=\"noDataTemplate\"\n                    [templateContext]=\"{\n                        templateRef: noDataTemplate ? noDataTemplate.templateRef : undefined\n                    }\">\n                </template>\n                <template [ngIf]=\"!noDataTemplate\">\n                    <div>NO DATA FOUND.</div>\n                </template>\n            </div>\n            <!--footer template-->\n            <template *ngIf=\"footerTemplate\"\n                [templateContext]=\"{\n                    templateRef: footerTemplate.templateRef\n                }\">\n            </template>\n        </kendo-popup>\n  "
                },] },
    ];
    /** @nocollapse */
    MultiSelectComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [kendo_angular_l10n_1.RTL,] },] },
        { type: selection_service_1.SelectionService, },
        { type: core_1.Renderer, },
        { type: navigation_service_1.NavigationService, },
        { type: core_1.ElementRef, },
    ]; };
    MultiSelectComponent.propDecorators = {
        'loading': [{ type: core_1.Input },],
        'data': [{ type: core_1.Input },],
        'value': [{ type: core_1.Input },],
        'valueField': [{ type: core_1.Input },],
        'textField': [{ type: core_1.Input },],
        'tabIndex': [{ type: core_1.Input },],
        'placeholder': [{ type: core_1.Input },],
        'disabled': [{ type: core_1.Input },],
        'filterable': [{ type: core_1.Input },],
        'popupSettings': [{ type: core_1.Input },],
        'valuePrimitive': [{ type: core_1.Input },],
        'clearButton': [{ type: core_1.Input },],
        'filterChange': [{ type: core_1.Output },],
        'valueChange': [{ type: core_1.Output },],
        'open': [{ type: core_1.Output },],
        'close': [{ type: core_1.Output },],
        'searchbar': [{ type: core_1.ViewChild, args: [searchbar_component_1.SearchBarComponent,] },],
        'template': [{ type: core_1.ContentChild, args: [item_template_directive_1.ItemTemplateDirective,] },],
        'headerTemplate': [{ type: core_1.ContentChild, args: [header_template_directive_1.HeaderTemplateDirective,] },],
        'footerTemplate': [{ type: core_1.ContentChild, args: [footer_template_directive_1.FooterTemplateDirective,] },],
        'tagTemplate': [{ type: core_1.ContentChild, args: [tag_template_directive_1.TagTemplateDirective,] },],
        'noDataTemplate': [{ type: core_1.ContentChild, args: [no_data_template_directive_1.NoDataTemplateDirective,] },],
        'getTabIndex': [{ type: core_1.HostBinding, args: ['attr.tabindex',] },],
        'focus': [{ type: core_1.HostListener, args: ['focus',] },],
        'blur': [{ type: core_1.HostListener, args: ['blur',] },],
        'widgetClasses': [{ type: core_1.HostBinding, args: ['class.k-widget',] }, { type: core_1.HostBinding, args: ['class.k-multiselect',] }, { type: core_1.HostBinding, args: ['class.k-header',] },],
        'focusedClass': [{ type: core_1.HostBinding, args: ['class.k-state-focused',] },],
        'disabledClass': [{ type: core_1.HostBinding, args: ['class.k-state-disabled',] },],
        'dir': [{ type: core_1.HostBinding, args: ['attr.dir',] },],
        'click': [{ type: core_1.HostListener, args: ['click',] },],
    };
    return MultiSelectComponent;
}());
exports.MultiSelectComponent = MultiSelectComponent;
