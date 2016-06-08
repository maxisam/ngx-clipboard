"use strict";
var core_1 = require('@angular/core');
var Clipboard = require('clipboard');
var ClipboardDirective = (function () {
    function ClipboardDirective(elmRef) {
        this.elmRef = elmRef;
        this.onSuccess = new core_1.EventEmitter();
        this.onError = new core_1.EventEmitter();
    }
    ClipboardDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.clipboard = new Clipboard(this.elmRef.nativeElement, {
            text: function () { return !!_this.targetElm ? _this.targetElm.nativeElement : _this.cbContent; }
        });
        this.clipboard.on('success', function (e) { return _this.onSuccess.emit(true); });
        this.clipboard.on('error', function (e) { return _this.onError.emit(true); });
    };
    ClipboardDirective.prototype.ngOnDestroy = function () {
        !!this.clipboard && this.clipboard.destroy();
    };
    __decorate([
        core_1.Input('ngIIclipboard'), 
        __metadata('design:type', core_1.ElementRef)
    ], ClipboardDirective.prototype, "targetElm", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ClipboardDirective.prototype, "cbContent", void 0);
    __decorate([
        core_1.Output('cbOnSuccess'), 
        __metadata('design:type', core_1.EventEmitter)
    ], ClipboardDirective.prototype, "onSuccess", void 0);
    __decorate([
        core_1.Output('cbOnError'), 
        __metadata('design:type', core_1.EventEmitter)
    ], ClipboardDirective.prototype, "onError", void 0);
    ClipboardDirective = __decorate([
        core_1.Directive({
            selector: '[ngIIclipboard]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], ClipboardDirective);
    return ClipboardDirective;
}());
exports.ClipboardDirective = ClipboardDirective;
//# sourceMappingURL=ngii-clipboard.directive.js.map