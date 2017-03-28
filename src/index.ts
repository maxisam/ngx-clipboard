import { ModuleWithProviders, NgModule } from '@angular/core';
import { ClipboardDirective } from './clipboard.directive';
export { Clipboard, ClipboardDirective } from './clipboard.directive';

@NgModule({
    declarations: [ClipboardDirective],
    exports: [ClipboardDirective]
})
export class ClipboardModule {
    // static forRoot(): ModuleWithProviders { return { ngModule: ClipboardModule, providers: [] }; }
}
