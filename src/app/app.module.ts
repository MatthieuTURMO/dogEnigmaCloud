import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import 'hammerjs';

//own components
import { AppComponent } from './app.component';

//material
import {
  MatButtonModule,
  MatCheckboxModule
} from '@angular/material';

//covalent
import {
  CovalentLayoutModule,
  CovalentStepsModule
} from '@covalent/core';
import { LoginComponent } from './login/login.component';

//own services
import { LoginService } from './-services/login.service';

//router
import { AppRoutingModule } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    CovalentLayoutModule,
    CovalentStepsModule,
    MatButtonModule,
    AppRoutingModule,
    MatCheckboxModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
