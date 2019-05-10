import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClipboardDirective } from './ngx-clipboard.directive';
import { ClipboardIfSupportedDirective } from './ngx-clipboard-if-supported.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [ClipboardDirective, ClipboardIfSupportedDirective],
    exports: [ClipboardDirective, ClipboardIfSupportedDirective]
})
export class ClipboardModule {}
