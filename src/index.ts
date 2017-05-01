import { WindowSrv } from './window.service';
import { ClipboardDirective } from './clipboard.directive';
import { CLIPBOARD_SERVICE_PROVIDER } from './clipboard.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
export * from './clipboard.directive';
export * from './clipboard.service';

@NgModule({
    declarations: [ClipboardDirective],
    exports: [ClipboardDirective],
    imports: [CommonModule],
    providers: [CLIPBOARD_SERVICE_PROVIDER]
})
export class ClipboardModule { }
