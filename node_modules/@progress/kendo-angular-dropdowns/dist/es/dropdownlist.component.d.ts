import { ElementRef, EventEmitter, OnDestroy, OnChanges, SimpleChange, Renderer, NgZone } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/skipWhile';
import { PopupSettings } from './popup-settings';
import { SelectionService } from './selection.service';
import { NavigationService } from './navigation.service';
import { ItemTemplateDirective } from './templates/item-template.directive';
import { ValueTemplateDirective } from './templates/value-template.directive';
import { HeaderTemplateDirective } from './templates/header-template.directive';
import { FooterTemplateDirective } from './templates/footer-template.directive';
import { NoDataTemplateDirective } from './templates/no-data-template.directive';
import { PreventableEvent } from './common/preventable-event';
/**
 * @hidden
 */
export declare const DROPDOWNLIST_VALUE_ACCESSOR: any;
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
export declare class DropDownListComponent implements ControlValueAccessor, OnDestroy, OnChanges {
    readonly width: any;
    readonly height: any;
    popupOpen: boolean;
    /**
     * @hidden
     */
    iconClass: string;
    /**
     * Sets and gets the loading state of the DropDownList.
     */
    loading: boolean;
    /**
     * Sets the data of the DropDownList.
     *
     * > The data has to be provided in an array-like list.
     */
    data: any;
    /**
     * Sets the value of the DropDownList. It could be either of the primitive (string, numbers) or of the complex (objects) type. To define the type, use the `valuePrimitive` option.
     *
     * > Selected values that are not present in the source are ignored.
     */
    value: any;
    /**
     * Sets the data item field that represents the item text. If the data contains only primitive values, do not define it.
     */
    textField: string;
    /**
     * Sets the data item field that represents the item value. If the data contains only primitive values, do not define it.
     */
    valueField: string;
    /**
     * Configures the popup of the DropDownList.
     *
     * The available options are:
     * - `animation: Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
     * - `width: Number`&mdash;Sets the width of the popup container. By default, the width of the host element is used.
     * - `height: Number`&mdash;Sets the height of the popup container. By default, the height is 200px.
     * - `popupClass: String`&mdash;Specifies a list of CSS classes that are used to style the popup.
     */
    popupSettings: PopupSettings;
    /**
     * Sets the text of the default empty item. The type of the defined value has to match the data type.
     */
    defaultItem: any;
    /**
     * Sets the disabled state of the component.
     */
    disabled: boolean;
    /**
     * Enables the [filtering]({% slug overview_ddl_kendouiforangular %}#toc-filtering) functionality of the DropDownList.
     */
    filterable: boolean;
    /**
     * Enables a case-insensitive search. When `filtration` is disabled, use this option.
     */
    ignoreCase: boolean;
    /**
     * Sets the delay before an item search is performed. When `filtration` is disabled, use this option.
     */
    delay: number;
    /**
     * Specifies the type of the selected value. If set to `true`, the selected value has to be of a primitive value.
     *
     * For more details, refer to the section on the [`valuePrimitive`]({% slug overview_ddl_kendouiforangular %}#toc-specify-the-value-type) property.
     */
    valuePrimitive: boolean;
    /**
     * Specifies the [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
     */
    tabIndex: number;
    /**
     * Fires each time the value is changed.
     *
     * For more details, refer to the section on the [`valueChange`]({% slug overview_ddl_kendouiforangular %}#toc-on-value-change) event.
     */
    valueChange: EventEmitter<any>;
    /**
     * Fires each time the user types in the filter input. You can filter the source based on the passed filtration value.
     *
     * For more details, refer to the section on the [`filterChange`]({% slug overview_ddl_kendouiforangular %}#toc-on-filter-change) event.
     */
    filterChange: EventEmitter<any>;
    /**
     * Fires each time the item selection is changed.
     *
     * For more details, refer to the section on the [`selectionChange`]({% slug overview_ddl_kendouiforangular %}#toc-on-change-of-item-selection) event.
     */
    selectionChange: EventEmitter<any>;
    /**
     * Fires each time the popup is about to open.
     * This event is preventable. If you cancel the event, the popup will remain closed.
     */
    open: EventEmitter<PreventableEvent>;
    /**
     * Fires each time the popup is about to close.
     * This event is preventable. If you cancel the event, the popup will remain opened.
     */
    close: EventEmitter<PreventableEvent>;
    itemTemplate: ItemTemplateDirective;
    valueTemplate: ValueTemplateDirective;
    headerTemplate: HeaderTemplateDirective;
    footerTemplate: FooterTemplateDirective;
    noDataTemplate: NoDataTemplateDirective;
    filterInput: ElementRef;
    /**
     * @hidden
     */
    blur(): void;
    /**
     * @hidden
     */
    focus(): void;
    /**
     * @hidden
     */
    keydown(event: any): void;
    /**
     * @hidden
     */
    keypress(event: any): void;
    /**
     * @hidden
     */
    click(): void;
    readonly widgetClasses: boolean;
    readonly role: string;
    readonly widgetTabIndex: number;
    readonly ariaDisabled: boolean;
    readonly ariaHasPopup: boolean;
    readonly ariaExpanded: boolean;
    readonly ariaOwns: string;
    readonly ariaActivedescendant: string;
    readonly dir: any;
    listBoxId: string;
    optionPrefix: string;
    filterText: string;
    popupWidth: string;
    popupMinWidth: string;
    isFocused: boolean;
    protected onTouchedCallback: Function;
    protected onChangeCallback: Function;
    private word;
    private last;
    private typingTimeout;
    private selectionService;
    private changeSubscription;
    private selectSubscription;
    private navigationService;
    private navigationSubscription;
    private enterSubscription;
    private openSubscription;
    private closeSubscription;
    private documentClick;
    private filterFocused;
    private wrapperBlurred;
    private componentBlurredSubscription;
    private renderer;
    private _zone;
    private _data;
    private _value;
    private _open;
    private _previousValue;
    private text;
    private wrapper;
    private _popupSettings;
    private direction;
    constructor(rtl: boolean, selectionService: SelectionService, navigationService: NavigationService, wrapper: ElementRef, renderer: Renderer, zone: NgZone);
    /**
     * @hidden
     */
    onFilterFocus(): void;
    /**
     * @hidden
     */
    popupOpened(): void;
    /**
     * @hidden
     */
    ngOnDestroy(): void;
    /**
     * @hidden
     */
    ngOnChanges(_changes: {
        [propertyName: string]: SimpleChange;
    }): void;
    /**
     * Toggles the visibility of the popup. If you use the `toggle` method to open or close the popup, the `open` and `close` events will not be fired.
     *
     * @param open - The state of the popup.
     */
    toggle(open: boolean): void;
    /**
     * Returns the current open state of the popup.
     */
    readonly isOpen: boolean;
    /**
     * @hidden
     */
    writeValue(newValue: any): void;
    /**
     * @hidden
     */
    registerOnChange(fn: any): void;
    /**
     * @hidden
     */
    registerOnTouched(fn: any): void;
    /**
     * @hidden
     */
    setDisabledState(isDisabled: boolean): void;
    /**
     * @hidden
     */
    readonly listContainerClasses: Object;
    /**
     * @hidden
     */
    readonly buttonClasses: Object;
    /**
     * @hidden
     */
    setDefaultItemClasses(): Object;
    /**
     * @hidden
     */
    getText(): any;
    /**
     * @hidden
     */
    getDefaultItemText(): any;
    private subscribeEvents();
    private unsubscribeEvents();
    private handleItemChange(event);
    private handleItemSelect(event);
    private handleEnter();
    protected verifySettings(newValue: any): void;
    protected componentBlur(): void;
    /**
     * @hidden
     */
    onMouseDown(event: any): void;
    protected onKeyPress(event: any): void;
    protected search(): void;
    protected selectNext(): void;
    protected change(dataItem: any): void;
    protected navigate(index: number): void;
    protected setState(value: any): void;
    /**
     * @hidden
     */
    handleFilter(event: any): void;
}
