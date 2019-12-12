import { Component, OnInit } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';

// import { ClipboardService } from 'local-ngx-clipboard';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    text1: string;
    text2: string;
    textModal: string;
    isCopied1: boolean;
    isCopied2: boolean;
    isCopied3: boolean;
    basic = false;
    constructor(private _clipboardService: ClipboardService) {}

    ngOnInit() {
        // Handle copy response globally https://github.com/maxisam/ngx-clipboard#handle-copy-response-globally
        this._clipboardService.copyResponse$.subscribe(re => {
            if (re.isSuccess) {
                alert('copy success!');
            }
        });
    }
    callServiceToCopy() {
        this._clipboardService.copyFromContent('This is copy thru service copyFromContent directly');
    }

    onCopyFailure() {
        alert('copy fail!');
    }
}
