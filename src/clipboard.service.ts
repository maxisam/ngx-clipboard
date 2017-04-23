import { Injectable, Renderer } from '@angular/core';

@Injectable()
export class ClipboardService {
    private tempTextArea: HTMLTextAreaElement;

    public get isSupported(): boolean {
        return !!document.queryCommandSupported && !!document.queryCommandSupported('copy');
    }

    public isTargetValid(element: HTMLInputElement | HTMLTextAreaElement): boolean {
        if (element && typeof element === 'object' && element.nodeType === 1) {
            if (element.hasAttribute('disabled')) {
                throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
            }
            return true;
        }
        throw new Error('Invalid "target" value, use a valid Element');
    }

    /**
     * copyFromInputElement
     */
    public copyFromInputElement(targetElm: HTMLInputElement | HTMLTextAreaElement, renderer: Renderer): boolean {
        this.selectTarget(targetElm, renderer);
        const re = this.copyText();
        this.clearSelection(targetElm, window);
        return re;
    }

    /**
     * Creates a fake textarea element, sets its value from `text` property,
     * and makes a selection on it.
     */
    public copyFromContent(content: string, renderer: Renderer) {
        if (!this.tempTextArea) {
            this.tempTextArea = this.createTempTextArea(document, window);
            document.body.appendChild(this.tempTextArea);
        }
        this.tempTextArea.value = content;
        return this.copyFromInputElement(this.tempTextArea, renderer);
    }

    // remove temporary textarea if any
    public destroy() {
        if (this.tempTextArea) {
            document.body.removeChild(this.tempTextArea);
            this.tempTextArea = undefined;
        }
    }

    // select the target html input element
    private selectTarget(inputElement: HTMLInputElement | HTMLTextAreaElement, renderer: Renderer) {
        // TODO: handle contenteditable or selection
        if (inputElement.nodeName === 'INPUT' || inputElement.nodeName === 'TEXTAREA') {
            // TODO: might need to set readonly first
            renderer.invokeElementMethod(inputElement, 'select');
            renderer.invokeElementMethod(inputElement, 'setSelectionRange', [0, inputElement.value.length]);
        }
    }

    private copyText(): boolean {
        try {
            // TODO: shouldn't use document directly
            return document.execCommand('copy');
        } catch (err) {
            throw new Error('Fail to perform copy');
        }
    }
    // Removes current selection and focus from `target` element.
    private clearSelection(inputElement: HTMLInputElement | HTMLTextAreaElement, window: Window) {
        inputElement && inputElement.blur();
        // TODO: should inject window
        window.getSelection().removeAllRanges();
    }

    // create a fake textarea for copy command
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
        let yPosition = window.pageYOffset || doc.documentElement.scrollTop;
        ta.style.top = yPosition + 'px';
        ta.setAttribute('readonly', '');
        return ta;
    }
}
