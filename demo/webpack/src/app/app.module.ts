import { AppComponent } from './app';
import { rootRouterConfig } from './app.routes';
import { Home } from './home/home';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ClipboardModule } from 'angular2-clipboard';

@NgModule({
  declarations: [AppComponent, Home],
  imports: [BrowserModule, FormsModule, HttpModule, ClipboardModule, RouterModule.forRoot(rootRouterConfig)],
  bootstrap: [AppComponent]
})
export class AppModule {
}
