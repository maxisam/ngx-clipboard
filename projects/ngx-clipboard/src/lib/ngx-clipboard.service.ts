import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';
import { WINDOW } from 'ngx-window-token';
import { Observable, Subject } from 'rxjs';

import { ClipboardParams, IClipboardResponse } from './interface';

/**
 * The following code is heavily copied from https://github.com/zenorocha/clipboard.js
 */
@Injectable({ providedIn: 'root' })
export class ClipboardService {
    private copySubject = new Subject<IClipboardResponse>();
    public copyResponse$: Observable<IClipboardResponse> = this.copySubject.asObservable();
    private tempTextArea: HTMLTextAreaElement | undefined;
    private config: ClipboardParams = {};

    constructor(@Inject(DOCUMENT) public document: any, @Optional() @Inject(WINDOW) private window: any) {}

    public configure(config: ClipboardParams) {
        this.config = config;
    }

    public copy(content: string): void {
        if (!this.isSupported || !content) {
            return this.pushCopyResponse({ isSuccess: false, content });
        }
        const copyResult = this.copyFromContent(content);
        if (copyResult) {
            return this.pushCopyResponse({ content, isSuccess: copyResult });
        }
        return this.pushCopyResponse({ isSuccess: false, content });
    }

    public get isSupported(): boolean {
        return !!this.document.queryCommandSupported && !!this.document.queryCommandSupported('copy') && !!this.window;
    }

    public isTargetValid(element: HTMLInputElement | HTMLTextAreaElement): boolean {
        if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
            if (element.hasAttribute('disabled')) {
                throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
            }
            return true;
        }
        throw new Error('Target should be input or textarea');
    }

    /**
     * Attempts to copy from an input `targetElm`
     */
    public copyFromInputElement(targetElm: HTMLInputElement | HTMLTextAreaElement, isFocus = true): boolean {
        try {
            this.selectTarget(targetElm);
            const re = this.copyText();
            this.clearSelection(isFocus ? targetElm : undefined, this.window);
            return re && this.isCopySuccessInIE11();
        } catch (error) {
            return false;
        }
    }

    /**
     * This is a hack for IE11 to return `true` even if copy fails.
     */
    public isCopySuccessInIE11(): boolean {
        const clipboardData = this.window['clipboardData'];
        if (clipboardData && clipboardData.getData) {
            if (!clipboardData.getData('Text')) {
                return false;
            }
        }
        return true;
    }

    /**
     * Creates a fake textarea element, sets its value from `text` property,
     * and makes a selection on it.
     */
    public copyFromContent(content: string, container: HTMLElement = this.document.body): boolean {
        // check if the temp textarea still belongs to the current container.
        // In case we have multiple places using ngx-clipboard, one is in a modal using container but the other one is not.
        if (this.tempTextArea && !container.contains(this.tempTextArea)) {
            this.destroy(this.tempTextArea.parentElement);
        }

        if (!this.tempTextArea) {
            this.tempTextArea = this.createTempTextArea(this.document, this.window);
            try {
                container.appendChild(this.tempTextArea);
            } catch (error) {
                throw new Error('Container should be a Dom element');
            }
        }
        this.tempTextArea.value = content;

        const toReturn = this.copyFromInputElement(this.tempTextArea, false);
        if (this.config.cleanUpAfterCopy) {
            this.destroy(this.tempTextArea.parentElement);
        }
        return toReturn;
    }

    /**
     * Remove temporary textarea if any exists.
     */
    public destroy(container: HTMLElement = this.document.body): void {
        if (this.tempTextArea) {
            container.removeChild(this.tempTextArea);
            // removeChild doesn't remove the reference from memory
            this.tempTextArea = undefined;
        }
    }

    /**
     * Select the target html input element.
     */
    private selectTarget(inputElement: HTMLInputElement | HTMLTextAreaElement): number | undefined {
        inputElement.select();
        inputElement.setSelectionRange(0, inputElement.value.length);
        return inputElement.value.length;
    }

    private copyText(): boolean {
        return this.document.execCommand('copy');
    }

    /**
     * Moves focus away from `target` and back to the trigger, removes current selection.
     */
    private clearSelection(inputElement: HTMLInputElement | HTMLTextAreaElement, window: Window): void {
        inputElement && inputElement.focus();
        window.getSelection().removeAllRanges();
    }

    /**
     * Creates a fake textarea for copy command.
     */
    private createTempTextArea(doc: Document, window: Window): HTMLTextAreaElement {
        const isRTL = doc.documentElement.getAttribute('dir') === 'rtl';
        let ta: HTMLTextAreaElement;
        ta = doc.createElement('textarea');
        // Prevent zooming on iOS
        ta.style.fontSize = '12pt';
        // Reset box model
        ta.style.border = '0';
        ta.style.padding = '0';
        ta.style.margin = '0';
        // Move element out of screen horizontally
        ta.style.position = 'absolute';
        ta.style[isRTL ? 'right' : 'left'] = '-9999px';
        // Move element to the same position vertically
        const yPosition = window.pageYOffset || doc.documentElement.scrollTop;
        ta.style.top = yPosition + 'px';
        ta.setAttribute('readonly', '');
        return ta;
    }

    /**
     * Pushes copy operation response to copySubject, to provide global access
     * to the response.
     */
    public pushCopyResponse(response: IClipboardResponse): void {
        this.copySubject.next(response);
    }

    /**
     * @deprecated use pushCopyResponse instead.
     */
    public pushCopyReponse(response: IClipboardResponse): void {
        this.pushCopyResponse(response);
    }
}
