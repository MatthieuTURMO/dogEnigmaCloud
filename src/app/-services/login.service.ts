import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  constructor(private http: Http) { }

  public login(pseudo: String, password: String) {
    return this.http.post('http://localhost:3000/api/login', {
      "pseudo": pseudo,
      "password": password
    }).map((res:Response) => res.json());
  }

}
