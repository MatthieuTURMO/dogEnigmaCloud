import { Component, OnInit } from '@angular/core';
import { UserService } from '../-services/user.service';
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
    confirmPassword : '',
    email: ''
  };

  private error: boolean = false;
  private loadingRequest: boolean = false;
  private messageError: String = '';

  constructor(private _userService: UserService) { }

  ngOnInit() {
    console.log('init');
  }

  onSubmit() {
    this.loadingRequest = true;
  }

  private checkAvailability($event){
    var pseudo = $event.target.value
    console.log(pseudo);
    this._userService.checkAvailability(pseudo).subscribe(
      res => {
        console.log('OK DISPO');
      },
      error => {
        console.log('PAS DISPO');
      }
    )
  }

}
