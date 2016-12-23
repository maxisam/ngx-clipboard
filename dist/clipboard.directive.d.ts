/// <reference types="clipboard" />
import { ElementRef, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import * as Clipboard from 'clipboard';
export { Clipboard };
export declare class ClipboardDirective implements OnInit, OnDestroy {
    private elmRef;
    clipboard: Clipboard;
    targetElm: ElementRef;
    cbContent: string;
    onSuccess: EventEmitter<boolean>;
    onError: EventEmitter<boolean>;
    constructor(elmRef: ElementRef);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
