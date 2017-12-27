import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import 'hammerjs';

//own components


//material
import {
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatSelectModule,
} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';

//covalent
import {
  CovalentLayoutModule,
  CovalentStepsModule
} from '@covalent/core';

//own components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

//own directives
import { ValidateEqualDirective } from './-directives/validate-equal.directive';

//own services
import { LoginService } from './-services/login.service';

//router
import { AppRoutingModule } from './app.routing';
import { AlertErrorComponent } from './alert-error/alert-error.component';
import { EmailPatternDirective } from './-directives/email-pattern.directive';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlertErrorComponent,
    RegisterComponent,
    ValidateEqualDirective,
    EmailPatternDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CovalentLayoutModule,
    CovalentStepsModule,
    MatButtonModule,
    AppRoutingModule,
    MatCheckboxModule,
    MatProgressBarModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    HttpModule
  ],
  providers: [
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
