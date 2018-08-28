import { Component } from '@angular/core';

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
}
