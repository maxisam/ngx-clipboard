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

    @Output() public cbOnSuccess: EventEmitter<any> = new EventEmitter<any>();

    @Output() public cbOnError: EventEmitter<any> = new EventEmitter<any>();

    constructor(public elmRef: ElementRef) { }

    public ngOnInit() {
        let option: Clipboard.Options;
        option = !!this.targetElm ? { target: () => <any>this.targetElm } : { text: () => this.cbContent };
        this.clipboard = new Clipboard(this.elmRef.nativeElement, option);
        this.clipboard.on('success', (e) => this.cbOnSuccess.emit(e));
        this.clipboard.on('error', (e) => this.cbOnError.emit(e));
    }

    public ngOnDestroy() {
        if (this.clipboard) {
            this.clipboard.destroy();
        }
    }
}
