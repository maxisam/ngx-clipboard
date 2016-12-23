import { NgModule } from '@angular/core';
import { ClipboardDirective } from './clipboard.directive';
export { Clipboard, ClipboardDirective } from './clipboard.directive';
export var ClipboardModule = (function () {
    function ClipboardModule() {
    }
    // static forRoot(): ModuleWithProviders { return { ngModule: ClipboardModule, providers: [] }; }
    ClipboardModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ClipboardDirective],
                    exports: [ClipboardDirective]
                },] },
    ];
    /** @nocollapse */
    ClipboardModule.ctorParameters = function () { return []; };
    return ClipboardModule;
}());
//# sourceMappingURL=D:/Users/saml/Documents/GitHub/angular2-clipboard/clipboard.module.js.map