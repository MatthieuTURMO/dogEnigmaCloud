import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import * as myGlobals from '../globals';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  public checkAvailability(pseudo: String) {
    return this.http.post(myGlobals.BASE_API_URL + '/users/check', {
      "pseudo": pseudo
    }).map((res:Response) => res.json());
  }

}
