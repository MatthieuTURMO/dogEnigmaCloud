import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClientModule, HttpRequest, HttpClient, HttpEventType, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import * as myGlobals from '../globals';
import 'rxjs/add/operator/map';



@Injectable()
export class UploadService {

  constructor(private http: HttpClient) { }

  public upload(file: File, next) {
    return Observable.fromPromise(new Promise((resolve, reject) => {
      var formData: FormData = new FormData();
      formData.append("file", file, file.name);

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200 && xhr.response=="success") {
            console.log('Succes de l\'upload du fichier dans file service');
            resolve();
          } else {
            console.log('Erreur dans upload file service', xhr.response);
            reject(xhr.response)
          }
        }
      }
      xhr.upload.addEventListener("progress", (ev: ProgressEvent) => {
        console.log(ev);
        next(ev);
        //You can handle progress events here if you want to track upload progress (I used an observable<number> to fire back updates to whomever called this upload)
      });
      xhr.open("POST", myGlobals.BASE_API_URL + '/upload/', true);
      xhr.send(formData);
    }));
  }
}
