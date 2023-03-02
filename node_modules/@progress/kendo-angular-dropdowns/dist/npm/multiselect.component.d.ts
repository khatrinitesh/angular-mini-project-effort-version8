import { SearchBarComponent } from './searchbar.component';
import { Renderer, ElementRef, OnDestroy, OnChanges, EventEmitter, AfterContentChecked, AfterViewInit } from '@angular/core';
import { SelectionService, SelectionEvent } from './selection.service';
import { PopupSettings } from './popup-settings';
import { NavigationService } from './navigation.service';
import { ItemTemplateDirective } from './templates/item-template.directive';
import { HeaderTemplateDirective } from './templates/header-template.directive';
import { FooterTemplateDirective } from './templates/footer-template.directive';
import { TagTemplateDirective } from './templates/tag-template.directive';
import { NoDataTemplateDirective } from './templates/no-data-template.directive';
import { PreventableEvent } from './common/preventable-event';
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
export declare class MultiSelectComponent implements OnDestroy, OnChanges, AfterContentChecked, AfterViewInit {
    private selectionService;
    private renderer;
    private navigationService;
    activeId: string;
    listBoxId: string;
    popupWidth: string;
    popupMinWidth: string;
    text: string;
    tags: any[];
    focusedTagIndex: number;
    popupOpen: boolean;
    /**
     * Sets and gets the loading state of the MultiSelect.
     */
    loading: boolean;
    /**
     * Sets the data of the MultiSelect.
     *
     * > The data has to be provided in an array of items.
     */
    data: any[];
    /**
     * Sets the value of the MultiSelect. It could be either of the primitive (string, numbers) or of the complex (objects) type. Use the `valuePrimitive` option to define the type.
     *
     * > Selected values that are not present in the source are ignored.
     */
    value: any[];
    /**
     * Sets the data item field that represents the item value. If the data contains only primitive values, do not define it.
     */
    valueField: string;
    /**
     * Sets the data item field that represents the item text. If the data contains only primitive values, do not define it.
     */
    textField: string;
    /**
     * Specifies the [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of the component.
     */
    tabIndex: number;
    /**
     * The hint displayed when the component is empty. Will not be displayed when values are selected.
     */
    placeholder: string;
    /**
     * Sets the disabled state of the component.
     */
    disabled: boolean;
    /**
     * Enables the [filtering]({% slug overview_multiselect_kendouiforangular %}#toc-filtering) functionality of the MultiSelect.
     */
    filterable: boolean;
    /**
     * Configures the popup of the MultiSelect.
     *
     * The available options are:
     * - `animation: Boolean`&mdash;Controls the popup animation. By default, the open and close animations are enabled.
     * - `width: Number`&mdash;Sets the width of the popup container. By default, the width of the host element is used.
     * - `height: Number`&mdash;Sets the height of the popup container. By default, the height is 200px.
     * - `popupClass: String`&mdash;Specifies a list of CSS classes that are used to style the popup.
     */
    popupSettings: PopupSettings;
    /**
     * Specifies the type of the selected value. If set to `true`, the selected value has to be of the primitive type.
     *
     * For more details, refer to the section on the [`valuePrimitive`]({% slug overview_multiselect_kendouiforangular %}#toc-specify-the-value-type) property.
     */
    valuePrimitive: boolean;
    /**
     * Unless this options is set to `false`, a button will appear when hovering over the component. Clicking that button resets the component value to an empty array and triggers the `change` event.
     */
    clearButton: boolean;
    /**
     * Fires each time the user types in the filter input. You can filter the source based on the passed filtration value.
     */
    filterChange: EventEmitter<string>;
    /**
     * Fires each time the value is changed.
     *
     * For more details, refer to the section on the [`valueChange`]({% slug overview_multiselect_kendouiforangular %}#toc-on-value-change) event.
     */
    valueChange: EventEmitter<any[]>;
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
    searchbar: SearchBarComponent;
    template: ItemTemplateDirective;
    headerTemplate: HeaderTemplateDirective;
    footerTemplate: FooterTemplateDirective;
    tagTemplate: TagTemplateDirective;
    noDataTemplate: NoDataTemplateDirective;
    readonly getTabIndex: number;
    /**
     * @hidden
     */
    focus(): void;
    /**
     * @hidden
     */
    blur(): void;
    readonly widgetClasses: boolean;
    readonly focusedClass: boolean;
    readonly disabledClass: boolean;
    readonly dir: string;
    /**
     * @hidden
     */
    click(): void;
    constructor(rtl: boolean, selectionService: SelectionService, renderer: Renderer, navigationService: NavigationService, wrapper: ElementRef);
    readonly listContainerClasses: any[];
    readonly width: any;
    /**
     * @hidden
     */
    popupOpened(): void;
    /**
     * @hidden
     */
    onMouseDown(event: any): void;
    /**
     * @hidden
     */
    verifySettings(): void;
    /**
     * @hidden
     */
    change(event: SelectionEvent): void;
    /**
     * @hidden
     */
    setState(value: any): void;
    /**
     * @hidden
     */
    handleBlur(): void;
    /**
     * @hidden
     */
    handleFilter(text: string): void;
    /**
     * @hidden
     */
    handleNavigate(event: any): void;
    /**
     * @hidden
     */
    removeTag(dataItem: any): void;
    /**
     * @hidden
     */
    clearAll(event: any): void;
    ngAfterContentChecked(): void;
    ngOnChanges(changes: any): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
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
    protected onChangeCallback: Function;
    protected onTouchedCallback: Function;
    private _data;
    private _placeholder;
    private wrapper;
    private _open;
    private _value;
    private selectedDataItems;
    private _popupSettings;
    private observableSubscriptions;
    private changeSubscription;
    private isFocused;
    private direction;
    private subscribeEvents();
    private unsubscribeEvents();
    private handleItemChange(event);
    private handleEnter();
    private handleClose();
    private handleEnd();
    private handleHome();
    private handleUp(index);
    private handleBackspace();
    private handleDelete();
    private handleLeftKey();
    private handleDownKey(index);
    private handleRightKey();
    private addItem(index);
    private removeItem(index);
    private search(text);
    private closePopup();
    private openPopup();
    private emitValueChange();
}
