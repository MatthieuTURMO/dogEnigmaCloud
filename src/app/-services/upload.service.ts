import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClientModule, HttpRequest, HttpClient, HttpEventType, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import * as myGlobals from '../globals';
import 'rxjs/add/operator/map';



@Injectable()
export class UploadService {

  constructor(private http: HttpClient) { }

  //upload un fichier vers le back end
  public upload(file: File, callback) {
    //on renvoie un observable pour attendre la fin de l'upload
    return Observable.fromPromise(new Promise((resolve, reject) => {
      var formData: FormData = new FormData();
      formData.append("file", file, file.name);

      var xhr = new XMLHttpRequest();
      //si y'a erreur ou succes sur l'envoi total du fichier
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
      //pour calculer la progression de l'envoi du fichier
      xhr.upload.addEventListener("progress", (ev: ProgressEvent) => {
        callback(ev);
      });
      xhr.open("POST", myGlobals.BASE_API_URL + '/upload/', true);
      xhr.send(formData);
    }));
  }
}
