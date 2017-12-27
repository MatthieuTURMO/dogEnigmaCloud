import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../-services/user.service';
import { AlertErrorComponent } from '../alert-error/alert-error.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TdLoadingService } from '@covalent/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import * as $ from 'jquery';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('registerForm') registerForm: HTMLFormElement;

  //variable à envoyer au serveur pour la persistance
  private newUser = {
    pseudo: '',
    prenom: '',
    nom: '',
    password: '',
    email: ''
  };

  private loadingCheckAvailability: boolean = false;
  private confirmPassword: String = '';
  private error: boolean = false;
  private loadingRequest: boolean = false;
  private messageError: String = '';

  constructor(
    private _userService: UserService,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) { }

  ngOnInit() {
    console.log('init');
  }



  onSubmit() {
    this.loadingRequest = true;
    this._userService.register(this.newUser).subscribe(
      res => {
        this.loadingRequest = false;
        this._router.navigate(['login']);
        console.log('OK');
      },
      err => {
        this.loadingRequest = false;
        console.log("ERR", err);
      }
    );
  }

  private checkAvailability($event, formData: any) {
    var pseudo = $event.target.value
    if (pseudo && pseudo !== '') {
      this.loadingCheckAvailability = true;
      this._userService.checkAvailability(pseudo).subscribe(
        res => {
          console.log('OK DISPO');
          this.loadingCheckAvailability = false;
          this._snackBar.dismiss();
          formData.form.controls['pseudo'].setErrors(null);
        },
        error => {
          this.loadingCheckAvailability = false;
          this._snackBar.open('Pseudo Indisponible', 'Fermer');
          formData.form.controls['pseudo'].setErrors({ 'available': true });
          console.log('PAS DISPO');
        }
      );
    }

  }

}
