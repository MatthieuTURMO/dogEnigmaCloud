import { Component, OnInit } from '@angular/core';
import { LoginService } from '../-services/login.service';
import { UserDataService } from '../-services/user-data.service';
import { AlertErrorComponent } from '../alert-error/alert-error.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(
    private _loginService: LoginService,
    private _userDataService : UserDataService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.loadingRequest = true;
    //connexion au serveur
    this._loginService.login(this.user.pseudo, this.user.password).subscribe(
      res => {
        //on enleve les loaders, les erreurs, et on stocke les données dans le navigateur
        this.loadingRequest = false;
        this.error = false;
        this._userDataService.setUser(res.user);
        //on redirige vers la page d'accueil
        this._router.navigate(['/dogEnigmaCloud/home']);
      },
      err => {
        this.loadingRequest = false;
        this.error = true;
        this.messageError = err;
        console.log('ERREUR LOGIN', err);
      });
  }
}
