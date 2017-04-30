import { CommonModule } from '@angular/common';
import { WindowSrv } from './window.service';
import { ClipboardService } from './clipboard.service';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ClipboardDirective } from './clipboard.directive';
export * from './clipboard.directive';
export * from './clipboard.service';

@NgModule({
    declarations: [ClipboardDirective],
    exports: [ClipboardDirective],
    imports: [CommonModule]
})
export class ClipboardModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: ClipboardModule,
            providers: [ClipboardService, WindowSrv]
        };
    }
}
