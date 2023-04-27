import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import {LoginComponent} from 'src/login/login.component';

@NgModule({
  declarations: [
    MainComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    MainRoutingModule
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class MainModule { }
