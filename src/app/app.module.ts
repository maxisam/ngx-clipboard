import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { ClipboardModule } from 'ngx-clipboard';

import { AppComponent } from './app.component';

// import { ClipboardModule } from 'local-ngx-clipboard';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, BrowserAnimationsModule, FormsModule, ClipboardModule, ClarityModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
