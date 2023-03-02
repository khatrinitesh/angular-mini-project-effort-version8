import { Directive, TemplateRef } from '@angular/core';
/**
 * Used for rendering content when there is no data present.
 *
 * To define the no-data template, nest a `<template>` tag with the `kendo<ComponentName>NoDataTemplate` directive inside the component tag.
 *
 * Use:
 * - The `kendoAutoCompleteItemTemplate` directive for the AutoComplete.
 * - The `kendoComboBoxItemTemplate` directive for the ComboBox.
 * - The `kendoDropDownListItemTemplate` directive for the DropDownList.
 * - The `kendoMultiSelectItemTemplate` directive for the MultiSelect.
 *
 *
 * @example
 * ```ts
 * @@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-combobox [data]="listItems">
 *    <template kendoComboBoxNoDataTemplate>
 *      <h4>No data!</h4>
 *    </template>
 *  </kendo-combobox>
 * `
 * })
 * class AppComponent {
 *   public listItems: Array<string> = [];
 * }
 * ```
 *
 * For more examples, refer to the article on [templates]({% slug overview_ddl_kendouiforangular %}#toc-templates).
 */
export var NoDataTemplateDirective = (function () {
    function NoDataTemplateDirective(templateRef) {
        this.templateRef = templateRef;
    }
    NoDataTemplateDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[kendoDropDownListNoDataTemplate],[kendoComboBoxNoDataTemplate],[kendoAutoCompleteNoDataTemplate],[kendoMultiSelectNoDataTemplate]'
                },] },
    ];
    /** @nocollapse */
    NoDataTemplateDirective.ctorParameters = function () { return [
        { type: TemplateRef, },
    ]; };
    return NoDataTemplateDirective;
}());
