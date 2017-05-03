import { ClipboardDirective } from './clipboard.directive';
import { CLIPBOARD_SERVICE_PROVIDER } from './clipboard.service';
import { _document, DOCUMENT } from './document.service';
import { WindowSrv } from './window.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
export * from './clipboard.directive';
export * from './clipboard.service';

@NgModule({
    declarations: [ClipboardDirective],
    exports: [ClipboardDirective],
    imports: [CommonModule],
    providers: [
        { provide: DOCUMENT, useFactory: _document },
        WindowSrv,
        CLIPBOARD_SERVICE_PROVIDER]
})
export class ClipboardModule { }
