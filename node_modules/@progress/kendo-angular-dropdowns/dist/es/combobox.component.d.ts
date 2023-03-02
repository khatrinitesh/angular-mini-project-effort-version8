import { ElementRef, EventEmitter, OnDestroy, OnChanges, SimpleChange } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { SearchBarComponent } from './searchbar.component';
import { ItemTemplateDirective } from './templates/item-template.directive';
import { HeaderTemplateDirective } from './templates/header-template.directive';
import { FooterTemplateDirective } from './templates/footer-template.directive';
import { PopupSettings } from './popup-settings';
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
import { PreventableEvent } from './common/preventable-event';
/**
 * @hidden
 */
export declare const COMBOBOX_VALUE_ACCESSOR: any;
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
export declare class ComboBoxComponent implements ControlValueAccessor, OnDestroy, OnChanges {
    private selectionService;
    private navigationService;
    readonly width: any;
    readonly height: any;
    text: any;
    popupOpen: boolean;
    dataItem: any;
    selected: any[];
    /**
     * Specifies whether the ComboBox allows user-defined values that are not present in the dataset.
     * The default value is `false`.
     *
     * For more information, refer to the section on [custom values]({% slug overview_combobox_kendouiforangular %}#toc-allow-for-custom-values).
     */
    allowCustom: boolean;
    /**
     * Sets the data of the ComboBox.
     *
     * > The data has to be provided in an array-like list.
     */
    data: any;
    /**
     * Sets the value of the ComboBox. It can either be of the primitive (string, numbers) or of the complex (objects) type. To define the type, use the `valuePrimitive` option.
     *
     * > Selected values that are not present in the dataset are considered custom values. Unless `allowCustom` is set to `true`, custom values are dismissed when "enter" key is pressed or after the component looses focus.
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
     * Specifies the type of the selected value. If set to `true`, the selected value has to be of the primitive type.
     *
     * For more details, refer to the section on the [`valuePrimitive`]({% slug overview_combobox_kendouiforangular %}#toc-value-selection) property.
     */
    valuePrimitive: boolean;
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
    valueNormalizer: (text: Observable<string>) => Observable<any>;
    /**
     * The hint displayed when the component is empty.
     *
     */
    placeholder: string;
    /**
     * Configures the popup of the ComboBox.
     *
     * The available options are:
     * - `animation: Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
     * - `width: Number | String`&mdash;Sets the width of the popup container. By default, the width of the host element is used  If set to `auto`, the component automatically adjusts the width of the popup, so no item labels are wrapped.
     * - `height: Number`&mdash;Sets the height of the popup container. By default, the height is 200px.
     * - `popupClass: String`&mdash;Specifies a list of CSS classes that are used to style the popup.
     */
    popupSettings: PopupSettings;
    /**
     * Sets and gets the loading state of the ComboBox.
     */
    loading: boolean;
    /**
     * @hidden
     *
     * Enables the auto-completion of the text based on the first data item.
     */
    suggest: boolean;
    /**
     * Unless this options is set to `false`, a button will appear when hovering over the component. Clicking that button resets the component value to undefined and triggers the `change` event.
     */
    clearButton: boolean;
    /**
     * Sets the disabled state of the component.
     */
    disabled: boolean;
    /**
     * Specifies the [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
     */
    tabIndex: number;
    /**
     * Enables the filtering functionality. If set to `true`, the component emits the `filterChange` event.
     */
    filterable: boolean;
    /**
     * Fires each time the value is changed.
     *
     * For more details, refer to the section on the [`valueChange`]({% slug overview_combobox_kendouiforangular %}#toc-on-value-change) event.
     */
    valueChange: EventEmitter<any>;
    /**
     * Fires each time an item selection is changed.
     *
     * For more details, refer to the section on the [`selectionChange`]({% slug overview_combobox_kendouiforangular %}#toc-on-change-of-item-selection) event.
     */
    selectionChange: EventEmitter<any>;
    /**
     * Fires each time the user types in the input.
     * You can filter the source based on the passed filtration value.
     *
     * For more details, refer to the section on the [`filterChange`]({% slug overview_combobox_kendouiforangular %}#toc-on-filter-change) event.
     */
    filterChange: EventEmitter<any>;
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
    readonly clearable: boolean;
    readonly widgetHeight: string;
    readonly role: string;
    readonly widgetTabIndex: number;
    readonly ariaDisabled: boolean;
    readonly ariaHasPopup: boolean;
    readonly ariaExpanded: boolean;
    readonly ariaOwns: string;
    readonly ariaActivedescendant: string;
    readonly dir: any;
    isFocused: boolean;
    listBoxId: string;
    optionPrefix: string;
    popupWidth: string;
    popupMinWidth: string;
    protected onChangeCallback: Function;
    protected onTouchedCallback: Function;
    private changeSubscribtion;
    private selectSubscribtion;
    private navigationSubscribtion;
    private enterSubscription;
    private escSubscription;
    private openSubscribtion;
    private closeSubscription;
    private valueSubscription;
    private _text;
    private _data;
    private _open;
    private _value;
    private _previousValue;
    private wrapper;
    private suggestedText;
    private backspacePressed;
    private _popupSettings;
    private customValueSubject;
    private valueSubject;
    private direction;
    constructor(rtl: boolean, selectionService: SelectionService, navigationService: NavigationService, wrapper: ElementRef);
    ngOnInit(): void;
    private createValueStream();
    private subscribeEvents();
    private unsubscribeEvents();
    private handleItemChange(event);
    private handleItemSelect(event);
    ngOnDestroy(): void;
    ngOnChanges(changes: {
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
    protected setState(value: any): void;
    protected search(text: any): void;
    /**
     * @hidden
     */
    getSuggestion(): string;
    protected navigate(index: number): void;
    /**
     * @hidden
     */
    handleNavigate(event: any): void;
    protected handleEnter(): void;
    /**
     * @hidden
     */
    handleBlur(): void;
    /**
     * @hidden
     */
    searchBarChange(text: string): void;
    /**
     * @hidden
     */
    handleFocus(): void;
    protected change(candidate: any, isCustom?: boolean): void;
    protected emitChange(): void;
    /**
     * @hidden
     */
    iconClick(): void;
    readonly listContainerClasses: Object;
}
