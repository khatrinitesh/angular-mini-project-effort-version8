import { Renderer, EventEmitter, ElementRef } from '@angular/core';
import { Direction } from './direction';
/**
 * @hidden
 */
export declare class SearchBarComponent {
    direction: Direction;
    disabled: boolean;
    placeholder: string;
    activeId: string;
    userInput: string;
    suggestedText: string;
    valueChange: EventEmitter<any>;
    onBlur: EventEmitter<any>;
    onFocus: EventEmitter<any>;
    onClick: EventEmitter<any>;
    onNavigate: EventEmitter<any>;
    input: ElementRef;
    readonly searchBarClass: boolean;
    readonly value: string;
    private _userInput;
    private renderer;
    constructor(rtl: boolean, renderer: Renderer);
    ngOnChanges(changes: any): void;
    private writeInputValue(text);
    private setInputSelection(start, end);
    handleInput(event: any): void;
    handleFocus(event: any): void;
    handleBlur(event: any): void;
    handleKeydown(event: any): void;
    focus(): void;
    resizeInput(size: number): void;
}
