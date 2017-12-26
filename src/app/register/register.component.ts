import { Component, OnInit } from '@angular/core';
import { LoginService } from '../-services/login.service';
import { AlertErrorComponent } from '../alert-error/alert-error.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import * as $ from 'jquery';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //variable à envoyer au serveur pour la persistance
  private newUser = {
    pseudo: '',
    prenom: '',
    nom: '',
    password: '',
    email: ''
  };

  private error: boolean = false;
  private loadingRequest: boolean = false;
  private messageError: String = '';

  constructor(private _loginService: LoginService) { }

  ngOnInit() {
    console.log('init');
  }

  onSubmit() {
    this.loadingRequest = true;
    //connexion au serveur
    this._loginService.login(this.newUser.pseudo, this.newUser.password).subscribe(
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
