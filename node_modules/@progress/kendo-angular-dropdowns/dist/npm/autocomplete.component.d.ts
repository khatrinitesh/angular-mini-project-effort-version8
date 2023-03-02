import { ElementRef, EventEmitter, OnDestroy, SimpleChange, OnChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { SearchBarComponent } from './searchbar.component';
import { ItemTemplateDirective } from './templates/item-template.directive';
import { HeaderTemplateDirective } from './templates/header-template.directive';
import { FooterTemplateDirective } from './templates/footer-template.directive';
import { PopupSettings } from './popup-settings';
import { SelectionService } from './selection.service';
import { NavigationService } from './navigation.service';
import { NoDataTemplateDirective } from './templates/no-data-template.directive';
import { PreventableEvent } from './common/preventable-event';
/**
 * @hidden
 */
export declare const AUTOCOMPLETE_VALUE_ACCESSOR: any;
/**
 * Represents the Kendo UI AutoComplete component for Angular.
 *
 * @example
 * ```ts
 * @@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-autocomplete
 *      [data]="listItems"
 *      [placeholder]="placeholder"
 *  >
 * `
 * })
 * class AppComponent {
 *   public placeholder: string = 'Type "it" for suggestions';
 *   public listItems: Array<string> = ["Item 1", "Item 2", "Item 3", "Item 4"];
 * }
 * ```
 */
export declare class AutoCompleteComponent implements ControlValueAccessor, OnDestroy, OnChanges {
    private selectionService;
    private navigationService;
    readonly width: any;
    readonly height: any;
    readonly listContainerClasses: Object;
    readonly suggestion: string;
    dataItem: any;
    popupOpen: boolean;
    /**
     * Sets the data of the AutoComplete.
     *
     * > The data has to be provided in an array-like list.
     */
    data: any;
    /**
     * Sets the value of the AutoComplete.
     *
     */
    value: any;
    /**
     * Sets the data item field that represents the item value. If the data contains only primitive values, do not define it.
     */
    valueField: string;
    /**
     * The hint displayed when the component is empty.
     *
     */
    placeholder: string;
    /**
     * Configures the popup of the AutoComplete.
     *
     * The available options are:
     * - `animation: Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
     * - `width: Number | String`&mdash;Sets the width of the popup container. By default, the width of the host element is used  If set to `auto`, the component automatically adjusts the width of the popup, so no item labels are wrapped.
     * - `height: Number`&mdash;Sets the height of the popup container. By default, the height is 200px.
     * - `popupClass: String`&mdash;Specifies a list of CSS classes that are used to style the popup.
     */
    popupSettings: PopupSettings;
    /**
     * Sets and gets the loading state of the AutoComplete.
     */
    loading: boolean;
    /**
     * @hidden
     *
     * Unless this options is set to `false`, a button will appear when hovering over the component. Clicking that button resets the component value to undefined and triggers the `change` event.
     */
    clearButton: boolean;
    /**
     * Enables the auto-completion of the text based on the first data item.
     */
    suggest: boolean;
    /**
     * Sets the disabled state of the component.
     */
    disabled: boolean;
    /**
     * Specifies the [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
     */
    tabIndex: number;
    /**
     * Enables the filter functionality. If set to `true`, the component emits the `filterChange` event.
     */
    filterable: boolean;
    /**
     * Fires each time the value is changed.
     *
     * For more details, refer to the section on the [`valueChange`]({% slug overview_autocomplete_kendouiforangular %}#toc-on-value-change) event.
     */
    valueChange: EventEmitter<string>;
    /**
     * Fires each time the user types in the input. You can filter the source based on the passed filtration value.
     *
     * For more details, refer to the section on the [`filterChange`]({% slug overview_autocomplete_kendouiforangular %}#toc-on-filter-change) event.
     */
    filterChange: EventEmitter<string>;
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
    template: ItemTemplateDirective;
    headerTemplate: HeaderTemplateDirective;
    footerTemplate: FooterTemplateDirective;
    noDataTemplate: NoDataTemplateDirective;
    searchbar: SearchBarComponent;
    readonly widgetClasses: boolean;
    isFocused: boolean;
    readonly isDisabled: boolean;
    readonly widgetHeight: string;
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
    popupWidth: string;
    popupMinWidth: string;
    protected onChangeCallback: Function;
    protected onTouchedCallback: Function;
    constructor(rtl: boolean, selectionService: SelectionService, navigationService: NavigationService, wrapper: ElementRef);
    ngOnDestroy(): void;
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
    clearValue(event: any): void;
    /**
     * @hidden
     */
    writeValue(value: any): void;
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
    protected verifySettings(newValue: any): void;
    protected search(text: any): void;
    protected navigate(index: number): void;
    /**
     * @hidden
     */
    handleNavigate(event: any): void;
    protected handleEnter(): void;
    /**
     * @hidden
     */
    searchBarChange(text: string): void;
    /**
     * @hidden
     */
    handleFocus(): void;
    /**
     * @hidden
     */
    handleBlur(): void;
    protected change(candidate: string): void;
    private _popupSettings;
    private _data;
    private _open;
    private _value;
    private _previousValue;
    private suggestedText;
    private backspacePressed;
    private changeSubscribtion;
    private focusSubscribtion;
    private navigationSubscribtion;
    private enterSubscription;
    private escSubscription;
    private closeSubscription;
    private wrapper;
    private _isFocused;
    private direction;
    private subscribeEvents();
    private unsubscribeEvents();
    private handleItemChange(event);
    private handleItemFocus(_event);
}
