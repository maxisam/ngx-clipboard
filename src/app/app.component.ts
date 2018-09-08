import { Component } from '@angular/core';
// import { ClipboardService } from 'local-ngx-clipboard';

import { ClipboardService } from 'ngx-clipboard';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    text1: string;
    text2: string;
    textModal: string;
    isCopied1: boolean;
    isCopied2: boolean;
    isCopied3: boolean;
    basic = false;
    constructor(private _clipboardService: ClipboardService) {}

    callServiceToCopy() {
        this._clipboardService.copyFromContent('This is copy thru service copyFromContent directly');
    }

    onCopyFailure() {
        alert('copy fail!');
    }
}
