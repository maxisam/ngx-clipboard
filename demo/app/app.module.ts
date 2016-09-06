import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { CommonModule }   from '@angular/common';
import { FormsModule }         from '@angular/forms';

/* App Root */
import { AppComponent }   from './app.component';

/* Feature Modules */
import { ClipboardModule }  from 'angular2-clipboard';
// import { ClipboardModule }  from './clipboard/clipboard.module';

@NgModule({
  imports: [BrowserModule, CommonModule, FormsModule, ClipboardModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})

export class AppModule { }
