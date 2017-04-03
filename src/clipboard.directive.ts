import { Directive, ElementRef, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import * as Clipboard from 'clipboard';

export { Clipboard };

@Directive({
    selector: '[ngxClipboard]'
})
export class ClipboardDirective implements OnInit, OnDestroy {
    public clipboard: Clipboard;

    @Input('ngxClipboard') public targetElm: ElementRef;

    @Input() public cbContent: string;

    @Output() public cbOnSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Output() public cbOnError: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(public elmRef: ElementRef) { }

    public ngOnInit() {
        let option: Clipboard.Options;
        option = !!this.targetElm ? { target: () => <any> this.targetElm } : { text: () => this.cbContent };
        this.clipboard = new Clipboard(this.elmRef.nativeElement, option);
        this.clipboard.on('success', () => this.cbOnSuccess.emit(true));
        this.clipboard.on('error', () => this.cbOnError.emit(true));
    }

    public ngOnDestroy() {
        if (this.clipboard) {
            this.clipboard.destroy();
        }
    }
}
