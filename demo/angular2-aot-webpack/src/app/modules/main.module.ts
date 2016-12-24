import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HelloWorldComponent } from '../components/hello-world.component';
import { ClipboardModule } from 'ngx-clipboard';
import { FormsModule } from '@angular/forms';


export { HelloWorldComponent };

@NgModule({
  bootstrap: [HelloWorldComponent],
  declarations: [HelloWorldComponent],
  imports: [BrowserModule,
  FormsModule,
  ClipboardModule],
  providers: []
})
export class MainModule {}
