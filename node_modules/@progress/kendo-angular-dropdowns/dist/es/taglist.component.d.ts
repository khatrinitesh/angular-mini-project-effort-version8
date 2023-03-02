import { EventEmitter } from '@angular/core';
import { TagTemplateDirective } from './templates/tag-template.directive';
/**
 * @hidden
 */
export declare class TagListComponent {
    tags: any[];
    textField: string;
    focused: number;
    template: TagTemplateDirective;
    disabled: boolean;
    activeId: string;
    removeTag: EventEmitter<any>;
    tagText(tag: any): string;
    tagCloseClick(event: any, tag: any): void;
    itemId(focused: number, index: number): string;
}
