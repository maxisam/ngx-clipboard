import {Directive, ElementRef, Input, Output, EventEmitter, OnInit, OnDestroy  } from '@angular/core';
import Clipboard = require('clipboard');

@Directive({
    selector: '[ngIIclipboard]'
})
export class ClipboardDirective implements OnInit, OnDestroy {
    clipboard: Clipboard;

    @Input('ngIIclipboard') targetElm: ElementRef;

    @Input() cbContent: string;

    @Output('cbOnSuccess') onSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Output('cbOnError') onError: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private elmRef: ElementRef) { }

    ngOnInit() {
        let option: ClipboardOptions;
        option = !!this.targetElm ? { target: () => <any>this.targetElm } : { text: () => this.cbContent };
        this.clipboard = new Clipboard(this.elmRef.nativeElement, option);
        this.clipboard.on('success', () => this.onSuccess.emit(true));
        this.clipboard.on('error', () => this.onError.emit(true));
    }

    ngOnDestroy() {
        !!this.clipboard && this.clipboard.destroy();
    }
}
