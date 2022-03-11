import {
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    Output,
    Renderer2
} from '@angular/core';
import { IClipboardResponse } from './interface';
import { ClipboardService } from './ngx-clipboard.service';

@Directive({ selector: '[ngxClipboard]' })
export class ClipboardDirective implements OnInit, OnDestroy {
    // https://github.com/maxisam/ngx-clipboard/issues/239#issuecomment-623330624
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('ngxClipboard')
    public targetElm: HTMLInputElement | HTMLTextAreaElement | undefined | '';
    @Input()
    public container: HTMLElement;

    @Input()
    public cbContent: string | undefined;

    @Input()
    public cbSuccessMsg: string;

    @Output()
    public cbOnSuccess: EventEmitter<IClipboardResponse> = new EventEmitter<IClipboardResponse>();

    @Output()
    public cbOnError: EventEmitter<any> = new EventEmitter<any>();

    private clickListener: () => void;

    constructor(
        private ngZone: NgZone,
        private host: ElementRef<HTMLElement>,
        private renderer: Renderer2,
        private clipboardSrv: ClipboardService
    ) {}

    // eslint-disable-next-line no-empty, @typescript-eslint/no-empty-function
    public ngOnInit() {
        this.ngZone.runOutsideAngular(() => {
            // By default each host listener schedules change detection and also wrapped
            // into additional function that calls `markForCheck()`. We're listening the `click`
            // event in the context of the root zone to avoid running unnecessary change detections,
            // since this directive doesn't do anything template-related (e.g. updates template variables).
            this.clickListener = this.renderer.listen(this.host.nativeElement, 'click', this.onClick);
        });
    }

    public ngOnDestroy() {
        if (this.clickListener) {
            this.clickListener();
        }
        this.clipboardSrv.destroy(this.container);
    }

    private onClick = (event: MouseEvent): void => {
        if (!this.clipboardSrv.isSupported) {
            this.handleResult(false, undefined, event);
        } else if (this.targetElm && this.clipboardSrv.isTargetValid(this.targetElm)) {
            this.handleResult(this.clipboardSrv.copyFromInputElement(this.targetElm), this.targetElm.value, event);
        } else if (this.cbContent) {
            this.handleResult(this.clipboardSrv.copyFromContent(this.cbContent, this.container), this.cbContent, event);
        }
    };

    /**
     * Fires an event based on the copy operation result.
     * @param succeeded
     */
    private handleResult(succeeded: boolean, copiedContent: string | undefined, event: MouseEvent): void {
        let response: IClipboardResponse = {
            isSuccess: succeeded,
            content: copiedContent,
            successMessage: this.cbSuccessMsg,
            event
        };

        if (succeeded) {
            if (this.cbOnSuccess.observed) {
                this.ngZone.run(() => {
                    this.cbOnSuccess.emit(response);
                });
            }
        } else {
            if (this.cbOnError.observed) {
                this.ngZone.run(() => {
                    this.cbOnError.emit(response);
                });
            }
        }

        this.clipboardSrv.pushCopyResponse(response);
    }
}
