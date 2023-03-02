import { TemplateRef } from '@angular/core';
/**
 * Used for rendering the list item content.
 *
 * To define the item template, nest a `<template>` tag with the `kendo<ComponentName>ItemTemplate` directive inside the component tag.
 *
 * Use:
 * - The `kendoAutoCompleteItemTemplate` directive for the AutoComplete.
 * - The `kendoComboBoxItemTemplate` directive for the ComboBox.
 * - The `kendoDropDownListItemTemplate` directive for the DropDownList.
 * - The `kendoMultiSelectItemTemplate` directive for the MultiSelect.
 *
 * The template context is set to the current component. To get a reference to the current data item, use the `let-dataItem` directive.
 *
 * @example
 * ```ts
 * @@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-combobox [data]="listItems">
 *    <template kendoComboBoxItemTemplate let-dataItem>
 *      <span>{{dataItem}} option</span>
 *    </template>
 *  </kendo-combobox>
 * `
 * })
 * class AppComponent {
 *   public listItems: Array<string> = ["Item 1", "Item 2", "Item 3", "Item 4"];
 * }
 * ```
 *
 * For more examples, refer to the article on [templates]({% slug overview_ddl_kendouiforangular %}#toc-templates).
 */
export declare class ItemTemplateDirective {
    templateRef: TemplateRef<any>;
    constructor(templateRef: TemplateRef<any>);
}
