import { Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { IClipboardResponse } from './interface';
import { ClipboardService } from './ngx-clipboard.service';

@Directive({
    selector: '[ngxClipboard]'
})
export class ClipboardDirective implements OnInit, OnDestroy {
    // tslint:disable-next-line:no-input-rename
    @Input('ngxClipboard')
    public targetElm: HTMLInputElement;
    @Input()
    public container: HTMLInputElement;

    @Input()
    public cbContent: string;

    @Input()
    public cbSuccessMsg: string;

    @Output()
    public cbOnSuccess: EventEmitter<IClipboardResponse> = new EventEmitter<IClipboardResponse>();

    @Output()
    public cbOnError: EventEmitter<any> = new EventEmitter<any>();
    constructor(private clipboardSrv: ClipboardService) {}

    // tslint:disable-next-line:no-empty
    public ngOnInit() {}

    public ngOnDestroy() {
        this.clipboardSrv.destroy(this.container);
    }

    @HostListener('click', ['$event.target'])
    public onClick(event: Event) {
        if (!this.clipboardSrv.isSupported) {
            this.handleResult(false, undefined, event);
        } else if (this.targetElm && this.clipboardSrv.isTargetValid(this.targetElm)) {
            this.handleResult(this.clipboardSrv.copyFromInputElement(this.targetElm), this.targetElm.value, event);
        } else if (this.cbContent) {
            this.handleResult(this.clipboardSrv.copyFromContent(this.cbContent, this.container), this.cbContent, event);
        }
    }

    /**
     * Fires an event based on the copy operation result.
     * @param succeeded
     */
    private handleResult(succeeded: boolean, copiedContent: string | undefined, event: Event) {
        let response: IClipboardResponse = {
            isSuccess: succeeded,
            event
        };

        if (succeeded) {
            response = Object.assign(response, {
                content: copiedContent,
                successMessage: this.cbSuccessMsg
            });
            this.cbOnSuccess.emit(response);
        } else {
            this.cbOnError.emit(response);
        }

        this.clipboardSrv.pushCopyReponse(response);
    }
}
