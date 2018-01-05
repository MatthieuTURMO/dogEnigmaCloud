import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

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
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

//covalent
import {
  CovalentLayoutModule,
  CovalentStepsModule,
  CovalentLoadingModule,
  CovalentFileModule
} from '@covalent/core';

//own components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

//own directives
import { ValidateEqualDirective } from './-directives/validate-equal.directive';

//own services
import { LoginService } from './-services/login.service';
import { UserService } from './-services/user.service';
import { UserDataService } from './-services/user-data.service';
import { UploadService } from './-services/upload.service';

//router
import { AppRoutingModule } from './app.routing';
import { AlertErrorComponent } from './alert-error/alert-error.component';
import { EmailPatternDirective } from './-directives/email-pattern.directive';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';

//Others modules
import { SidebarModule } from 'ng-sidebar';
import { MoncompteComponent } from './moncompte/moncompte.component';
import { HelpComponent } from './help/help.component';
import { MnFullpageModule } from 'ngx-fullpage';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlertErrorComponent,
    RegisterComponent,
    ValidateEqualDirective,
    EmailPatternDirective,
    HomeComponent,
    MenuComponent,
    MoncompteComponent,
    HelpComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CovalentLayoutModule,
    CovalentStepsModule,
    MatButtonModule,
    AppRoutingModule,
    MatCheckboxModule,
    CovalentFileModule,
    MatProgressBarModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    CovalentLoadingModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    SidebarModule.forRoot(),
    MnFullpageModule.forRoot(),
    HttpModule
  ],
  providers: [
    LoginService,
    UserService,
    UserDataService,
    UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
