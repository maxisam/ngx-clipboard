"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var Clipboard = require("clipboard");
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
        this.clipboard.on('success', function () { return _this.onSuccess.emit(true); });
        this.clipboard.on('error', function () { return _this.onError.emit(true); });
    };
    ClipboardDirective.prototype.ngOnDestroy = function () {
        if (this.clipboard) {
            this.clipboard.destroy();
        }
    };
    return ClipboardDirective;
}());
__decorate([
    core_1.Input('xngClipboard'),
    __metadata("design:type", core_1.ElementRef)
], ClipboardDirective.prototype, "targetElm", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ClipboardDirective.prototype, "cbContent", void 0);
__decorate([
    core_1.Output('cbOnSuccess'),
    __metadata("design:type", core_1.EventEmitter)
], ClipboardDirective.prototype, "onSuccess", void 0);
__decorate([
    core_1.Output('cbOnError'),
    __metadata("design:type", core_1.EventEmitter)
], ClipboardDirective.prototype, "onError", void 0);
ClipboardDirective = __decorate([
    core_1.Directive({
        selector: '[xngClipboard]'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], ClipboardDirective);
exports.ClipboardDirective = ClipboardDirective;
//# sourceMappingURL=clipboard.directive.js.map