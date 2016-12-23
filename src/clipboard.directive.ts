import { Directive, ElementRef, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import * as Clipboard from 'clipboard';

export { Clipboard };


@Directive({
    selector: '[xngClipboard]'
})
export class ClipboardDirective implements OnInit, OnDestroy {
    clipboard: Clipboard;

    @Input('xngClipboard') targetElm: ElementRef;

    @Input() cbContent: string;

    @Output('cbOnSuccess') onSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Output('cbOnError') onError: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private elmRef: ElementRef) { }

    ngOnInit() {
        let option: Clipboard.Options;
        option = !!this.targetElm ? { target: () => <any>this.targetElm } : { text: () => this.cbContent };
        this.clipboard = new Clipboard(this.elmRef.nativeElement, option);
        this.clipboard.on('success', () => this.onSuccess.emit(true));
        this.clipboard.on('error', () => this.onError.emit(true));
    }

    ngOnDestroy() {
        if (this.clipboard) {
            this.clipboard.destroy();
        }
    }
}
