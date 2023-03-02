"use strict";
var core_1 = require('@angular/core');
var multiselect_component_1 = require('./multiselect.component');
var taglist_component_1 = require('./taglist.component');
var tag_template_directive_1 = require('./templates/tag-template.directive');
var shared_module_1 = require('./shared.module');
var shared_directives_module_1 = require('./shared-directives.module');
var MULTISELECT_DIRECTIVES = [
    multiselect_component_1.MultiSelectComponent,
    taglist_component_1.TagListComponent,
    tag_template_directive_1.TagTemplateDirective
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
var MultiSelectModule = (function () {
    function MultiSelectModule() {
    }
    MultiSelectModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [MULTISELECT_DIRECTIVES],
                    exports: [MULTISELECT_DIRECTIVES, shared_directives_module_1.SharedDirectivesModule],
                    imports: [shared_module_1.SharedModule]
                },] },
    ];
    /** @nocollapse */
    MultiSelectModule.ctorParameters = function () { return []; };
    return MultiSelectModule;
}());
exports.MultiSelectModule = MultiSelectModule;
