"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
        var option;
        option = !!this.targetElm ? { target: function () { return _this.targetElm; } } : { text: function () { return _this.cbContent; } };
        this.clipboard = new Clipboard(this.elmRef.nativeElement, option);
        this.clipboard.on('success', function (e) { return _this.onSuccess.emit(true); });
        this.clipboard.on('error', function (e) { return _this.onError.emit(true); });
    };
    ClipboardDirective.prototype.ngOnDestroy = function () {
        !!this.clipboard && this.clipboard.destroy();
    };
    __decorate([
        core_1.Input('ngIIclipboard')
    ], ClipboardDirective.prototype, "targetElm");
    __decorate([
        core_1.Input()
    ], ClipboardDirective.prototype, "cbContent");
    __decorate([
        core_1.Output('cbOnSuccess')
    ], ClipboardDirective.prototype, "onSuccess");
    __decorate([
        core_1.Output('cbOnError')
    ], ClipboardDirective.prototype, "onError");
    ClipboardDirective = __decorate([
        core_1.Directive({
            selector: '[ngIIclipboard]'
        })
    ], ClipboardDirective);
    return ClipboardDirective;
}());
exports.ClipboardDirective = ClipboardDirective;
