import { Component, OnInit } from '@angular/core';
import { LoginService } from '../-services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _loginService: LoginService) { }

  ngOnInit() {
    console.log('init');

    this._loginService.login("aaa", "bbb").subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      });
  }

}