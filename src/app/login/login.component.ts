import { Component, OnInit } from '@angular/core';
import { LoginService } from '../-services/login.service';
import { AlertErrorComponent } from '../alert-error/alert-error.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loadingRequest: boolean = false;
  private error: any = false;
  private messageError: String = '';

  private user = {
    pseudo: '',
    password: ''
  };

  constructor(private _loginService: LoginService) { }

  ngOnInit() {
    console.log('init');
  }

  onSubmit() {
    console.log(this.error);
    this.loadingRequest = true;
    this._loginService.login(this.user.pseudo, this.user.password).subscribe(
      res => {
        this.loadingRequest = false;
        this.error = false;
      },
      err => {
        this.loadingRequest = false;
        this.error = true;
        this.messageError = err;
      });
  }

}
