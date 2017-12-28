import { Injectable } from '@angular/core';

//SERVICE POUR STOCKER LES DONNES UTILISATEUR COURANT, EVITE DE PASSER PAR LE LOCALSTORAGE POUR LES APPELS REDONDANTS AUX DONNES

@Injectable()
export class UserDataService {

  //par defaut on prend le localstorage, uniquement pour les tests
  private user : any = JSON.parse(localStorage.getItem('currentUser'));

  constructor() { }

  public setUser(user : any){
    this.user = user;
    localStorage.setItem('currentUser',JSON.stringify(user));
  }

  public getUser(){
    return this.user;
  }

  public eraseUser(){
    this.user = {};
    localStorage.removeItem('currentUser');
  }

}
