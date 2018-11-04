import { Inject, Injectable, InjectionToken, Optional, SkipSelf, PLATFORM_ID } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { WindowRef } from 'ngx-window-token';

@Injectable()
export class ClipboardService {
    private tempTextArea: HTMLTextAreaElement | undefined;

    constructor(
        @Inject(DOCUMENT) public document: any,
        private window: WindowRef,
        @Inject(PLATFORM_ID) private platformId: Object) {}

    public get isSupported(): boolean {
        return !!this.document.queryCommandSupported && !!this.document.queryCommandSupported('copy');
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
     * copyFromInputElement
     */
    public copyFromInputElement(targetElm: HTMLInputElement | HTMLTextAreaElement): boolean {
        try {
            if (isPlatformBrowser(this.platformId)) {
                this.selectTarget(targetElm);
                const re = this.copyText();
                this.clearSelection(targetElm, this.window.nativeWindow);
                return re && this.isCopySuccessInIE11();
            }
        } catch (error) {
            return false;
        }
    }

    // this is for IE11 return true even if copy fail
    isCopySuccessInIE11() {
        if (isPlatformBrowser(this.platformId)) {
            const clipboardData = this.window.nativeWindow['clipboardData'];
            if (clipboardData && clipboardData.getData) {
                if (!clipboardData.getData('Text')) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Creates a fake textarea element, sets its value from `text` property,
     * and makes a selection on it.
     */
    public copyFromContent(content: string, container: HTMLElement) {
        if (isPlatformBrowser(this.platformId)) {
            container = container || this.window.nativeWindow.document.body;
            // check if the temp textarea is still belong the current container.
            // In case we have multiple places using ngx-clipboard, one is in a modal using container but the other one is not.
            if (this.tempTextArea && !container.contains(this.tempTextArea)) {
                this.destroy(this.tempTextArea.parentElement);
            }

            if (!this.tempTextArea) {
                this.tempTextArea = this.createTempTextArea(this.document, this.window.nativeWindow);
                try {
                    container.appendChild(this.tempTextArea);
                } catch (error) {
                    throw new Error('Container should be a Dom element');
                }
            }
            this.tempTextArea.value = content;
            return this.copyFromInputElement(this.tempTextArea);
        }
    }

    // remove temporary textarea if any
    public destroy(container: HTMLElement) {
        if (isPlatformBrowser(this.platformId)) {
            container = container || this.window.nativeWindow.document.body;
            if (this.tempTextArea) {
                container.removeChild(this.tempTextArea);
                // removeChild doesn't remove the reference from memory
                this.tempTextArea = undefined;
            }
        }
    }

    // select the target html input element
    private selectTarget(inputElement: HTMLInputElement | HTMLTextAreaElement): number | undefined {
        if (isPlatformBrowser(this.platformId)) {
            inputElement.select();
            inputElement.setSelectionRange(0, inputElement.value.length);
            return inputElement.value.length;
        }
    }

    private copyText(): boolean {
        if (isPlatformBrowser(this.platformId)) {
            return this.document.execCommand('copy');
        }
    }
    // Removes current selection and focus from `target` element.
    private clearSelection(inputElement: HTMLInputElement | HTMLTextAreaElement, window: Window) {
        if (isPlatformBrowser(this.platformId)) {
            // tslint:disable-next-line:no-unused-expression
            inputElement && inputElement.blur();
            window.getSelection().removeAllRanges();
        }
    }

    // create a fake textarea for copy command
    private createTempTextArea(doc: Document, window: Window): HTMLTextAreaElement {
        if (isPlatformBrowser(this.platformId)) {
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
    }
}
// this pattern is mentioned in https://github.com/angular/angular/issues/13854 in #43
export function CLIPBOARD_SERVICE_PROVIDER_FACTORY(doc: Document, win: WindowRef, parentDispatcher: ClipboardService, platformId: Object) {
    return parentDispatcher || new ClipboardService(doc, win, platformId);
}

export const CLIPBOARD_SERVICE_PROVIDER = {
    deps: [DOCUMENT as InjectionToken<Document>, WindowRef, [new Optional(), new SkipSelf(), ClipboardService], PLATFORM_ID],
    provide: ClipboardService,
    useFactory: CLIPBOARD_SERVICE_PROVIDER_FACTORY
};
