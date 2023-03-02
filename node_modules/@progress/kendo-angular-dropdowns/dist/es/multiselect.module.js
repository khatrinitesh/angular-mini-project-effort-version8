import { NgModule } from '@angular/core';
import { MultiSelectComponent } from './multiselect.component';
import { TagListComponent } from './taglist.component';
import { TagTemplateDirective } from './templates/tag-template.directive';
import { SharedModule } from './shared.module';
import { SharedDirectivesModule } from './shared-directives.module';
var MULTISELECT_DIRECTIVES = [
    MultiSelectComponent,
    TagListComponent,
    TagTemplateDirective
];
/**
 * @hidden
 *
 * The exported package module.
 *
 * The package exports:
 * - `MultiSelectComponent`&mdash;The MultiSelect component class.
 * - `ItemTemplateDirective`&mdash;The item template directive.
 * - `TagTemplateDirective`&mdash;The tag template directive.
 * - `HeaderTemplateDirective`&mdash;The header template directive.
 * - `FooterTemplateDirective`&mdash;The footer template directive.
 * - `NoDataTemplateDirective`&mdash;The no-data template directive.
 */
export var MultiSelectModule = (function () {
    function MultiSelectModule() {
    }
    MultiSelectModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [MULTISELECT_DIRECTIVES],
                    exports: [MULTISELECT_DIRECTIVES, SharedDirectivesModule],
                    imports: [SharedModule]
                },] },
    ];
    /** @nocollapse */
    MultiSelectModule.ctorParameters = function () { return []; };
    return MultiSelectModule;
}());
