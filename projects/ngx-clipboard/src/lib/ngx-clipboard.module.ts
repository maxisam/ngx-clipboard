import { ClipboardDirective } from './ngx-clipboard.directive';
import { CLIPBOARD_SERVICE_PROVIDER } from './ngx-clipboard.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WINDOW_PROVIDERS } from 'ngx-window-token';
export * from './ngx-clipboard.directive';
export * from './ngx-clipboard.service';

@NgModule({
  imports: [CommonModule],
  // tslint:disable-next-line:object-literal-sort-keys
  declarations: [ClipboardDirective],
  exports: [ClipboardDirective],
  providers: [CLIPBOARD_SERVICE_PROVIDER, WINDOW_PROVIDERS]
})
export class ClipboardModule {}
