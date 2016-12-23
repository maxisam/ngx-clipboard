import { Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import * as Clipboard from 'clipboard';
export { Clipboard };
export var ClipboardDirective = (function () {
    function ClipboardDirective(elmRef) {
        this.elmRef = elmRef;
        this.onSuccess = new EventEmitter();
        this.onError = new EventEmitter();
    }
    ClipboardDirective.prototype.ngOnInit = function () {
        var _this = this;
        var option;
        option = !!this.targetElm ? { target: function () { return _this.targetElm; } } : { text: function () { return _this.cbContent; } };
        this.clipboard = new Clipboard(this.elmRef.nativeElement, option);
        this.clipboard.on('success', function () { return _this.onSuccess.emit(true); });
        this.clipboard.on('error', function () { return _this.onError.emit(true); });
    };
    ClipboardDirective.prototype.ngOnDestroy = function () {
        if (this.clipboard) {
            this.clipboard.destroy();
        }
    };
    ClipboardDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[xngClipboard]'
                },] },
    ];
    /** @nocollapse */
    ClipboardDirective.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    ClipboardDirective.propDecorators = {
        'targetElm': [{ type: Input, args: ['xngClipboard',] },],
        'cbContent': [{ type: Input },],
        'onSuccess': [{ type: Output, args: ['cbOnSuccess',] },],
        'onError': [{ type: Output, args: ['cbOnError',] },],
    };
    return ClipboardDirective;
}());
//# sourceMappingURL=D:/Users/saml/Documents/GitHub/angular2-clipboard/clipboard.directive.js.map