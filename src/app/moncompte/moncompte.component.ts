import { Component, OnInit } from '@angular/core';
import { UploadService } from '../-services/upload.service';

@Component({
  selector: 'app-moncompte',
  templateUrl: './moncompte.component.html',
  styleUrls: ['./moncompte.component.css']
})
export class MoncompteComponent implements OnInit {

  files: any;
  disabled: boolean = false;
  avancement = 0;

  constructor(
    private _uploadService: UploadService
  ) { }


  toggleDisabled(): void {
    this.disabled = !this.disabled;
  }


  ngOnInit() {
  }

  //upload du fichier
  onSubmit() {
    var self = this;
    this._uploadService.upload(this.files, function (ev) {
      //calcul du pourcentage d'avancement de l'upload du fichier
      var total = ev.total;
      var loaded = ev.loaded;
      self.avancement = (loaded / total) * 100;
      console.log("Avancement : ", self.avancement);
    }).subscribe(
      success => {
        console.log('SUCCES UPLOAD');
      },
      err => {
        console.log('ERREUR UPLOAD', err);
      });
  }

}
