import { NgModule } from '@angular/core'
import { RouterModule } from "@angular/router";
import { rootRouterConfig } from "./app.routes";
import { AppComponent } from "./app";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { Home } from './home/home';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ClipboardModule } from 'angular2-clipboard';

@NgModule({
  declarations: [AppComponent, Home],
  imports: [BrowserModule, FormsModule, HttpModule, ClipboardModule, RouterModule.forRoot(rootRouterConfig)],
  bootstrap: [AppComponent]
})
export class AppModule {
}
