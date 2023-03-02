import { TemplateRef } from '@angular/core';
/**
 * Used for rendering the selected value of the component. It can only be used with the DropDownList.
 *
 * The template context is set to the current DropDownList. To get a reference to the current data item, use the `let-dataItem` directive.
 *
 * @example
 * ```ts
 * @@Component({
 * selector: 'my-app',
 * template: `
 *  <kendo-dropdownlist [data]="listItems">
 *    <template kendoDropDownListValueTemplate let-dataItem>
 *      <span>{{dataItem}} option</span>
 *    </template>
 *  </kendo-dropdownlist>
 * `
 * })
 * class AppComponent {
 *   public listItems: Array<string> = ["Item 1", "Item 2", "Item 3", "Item 4"];
 * }
 * ```
 *
 * For more examples, refer to the article on [templates]({% slug overview_ddl_kendouiforangular %}#toc-templates).
 */
export declare class ValueTemplateDirective {
    templateRef: TemplateRef<any>;
    constructor(templateRef: TemplateRef<any>);
}
