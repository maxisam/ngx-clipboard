import { NgModule } from '@angular/core';
import { ClipboardDirective } from './clipboard.directive';

@NgModule({
    declarations: [ClipboardDirective],
    exports: [ClipboardDirective]
})
export class ClipboardModule { }
