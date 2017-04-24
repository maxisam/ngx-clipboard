import { WindowSrv } from './window.service';
import { BrowserModule } from '@angular/platform-browser';
import { ClipboardService } from './clipboard.service';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ClipboardDirective } from './clipboard.directive';
export * from './clipboard.directive';
export * from './clipboard.service';

@NgModule({
    declarations: [ClipboardDirective],
    exports: [ClipboardDirective],
    imports: [BrowserModule],
    providers: [ClipboardService, WindowSrv]
})
export class ClipboardModule {
    // static forRoot(): ModuleWithProviders { return { ngModule: ClipboardModule, providers: [ClipboardService] }; }
}
