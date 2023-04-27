import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';


@NgModule({
  declarations: [
    LoginComponent,
  
  ],
  imports: [
    BrowserModule,
    LoginRoutingModule
  ],
  providers: [],
  bootstrap: [LoginComponent]
})
export class MainModule { }
