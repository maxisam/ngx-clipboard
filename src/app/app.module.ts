import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { ClipboardModule } from 'ngx-clipboard';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserAnimationsModule, FormsModule, ClipboardModule, ClarityModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
