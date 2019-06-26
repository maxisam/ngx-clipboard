import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { CLIPBOARD_ROOT_OPTIONS } from './injection-tokens';
import { ClipboardParams } from './interface';
import { ClipboardIfSupportedDirective } from './ngx-clipboard-if-supported.directive';
import { ClipboardDirective } from './ngx-clipboard.directive';
import { ClipboardService } from './ngx-clipboard.service';

@NgModule({
    imports: [CommonModule],
    declarations: [ClipboardDirective, ClipboardIfSupportedDirective],
    exports: [ClipboardDirective, ClipboardIfSupportedDirective],
    providers: [ClipboardService]
})
export class ClipboardModule {
    static forRoot(params: ClipboardParams): ModuleWithProviders {
        return {
            ngModule: ClipboardModule,
            providers: [
                ClipboardService,
                { provide: CLIPBOARD_ROOT_OPTIONS, useValue: params }
            ]
        };
    }
}
