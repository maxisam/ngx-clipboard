import { Directive, OnChanges, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';

import { ClipboardService } from './ngx-clipboard.service';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[ngxClipboardIfSupported]',
})
export class ClipboardIfSupportedDirective implements OnInit {
    constructor(
        private _clipboardService: ClipboardService,
        private _viewContainerRef: ViewContainerRef,
        private _templateRef: TemplateRef<any>
    ) {}

    ngOnInit() {
      if (this._clipboardService.isSupported) {
        this._viewContainerRef.createEmbeddedView(this._templateRef);
      }
    }
}
