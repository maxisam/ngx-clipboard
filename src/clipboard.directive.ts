import { Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { ClipboardService } from './clipboard.service';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[ngxClipboard]'
})
export class ClipboardDirective implements OnInit, OnDestroy {
    @Input('ngxClipboard') public targetElm: HTMLInputElement;

    @Input() public cbContent: string;

    @Output() public cbOnSuccess: EventEmitter<any> = new EventEmitter<any>();

    @Output() public cbOnError: EventEmitter<any> = new EventEmitter<any>();
    constructor(
        private clipboardSrv: ClipboardService,

    ) { }

    // tslint:disable-next-line:no-empty
    public ngOnInit() { }

    public ngOnDestroy() {
        this.clipboardSrv.destroy();
    }

    @HostListener('click', ['$event.target']) public onClick(event: Event) {
        if (!this.clipboardSrv.isSupported) {
            this.handleResult(false, undefined);
        } else if (this.targetElm && this.clipboardSrv.isTargetValid(this.targetElm)) {
            this.handleResult(this.clipboardSrv.copyFromInputElement(this.targetElm),
                this.targetElm.value);
        } else if (this.cbContent) {
            this.handleResult(this.clipboardSrv.copyFromContent(this.cbContent), this.cbContent);
        }
    }

    /**
     * Fires an event based on the copy operation result.
     * @param succeeded
     */
    private handleResult(succeeded: boolean, copiedContent: string | undefined) {
        if (succeeded) {
            this.cbOnSuccess.emit({ isSuccess: true, content: copiedContent });
        } else {
            this.cbOnError.emit({ isSuccess: false });
        }
    }
}
