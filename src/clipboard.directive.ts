import { Directive, ElementRef, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import * as Clipboard from 'clipboard';

export { Clipboard };

@Directive({
    selector: '[ngxClipboard]'
})
export class ClipboardDirective implements OnInit, OnDestroy {
    public clipboard: Clipboard;

    @Input('ngxClipboard') private targetElm: ElementRef;

    @Input() private cbContent: string;

    @Output() private cbOnSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Output() private cbOnError: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private elmRef: ElementRef) { }

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
