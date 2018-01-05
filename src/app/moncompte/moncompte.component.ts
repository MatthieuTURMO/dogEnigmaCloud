import { Component, OnInit } from '@angular/core';
import { UploadService } from '../-services/upload.service';
import { TdLoadingService, LoadingType, LoadingMode } from '@covalent/core';

@Component({
  selector: 'app-moncompte',
  templateUrl: './moncompte.component.html',
  styleUrls: ['./moncompte.component.css']
})
export class MoncompteComponent implements OnInit {

  files: any;
  disabled: boolean = false;
  avancement = 0;
  dataUploading = false;
  constructor(
    private _uploadService: UploadService,
    private _loadingService: TdLoadingService
  ) {
    // this._loadingService.create({
    //   name: 'configFullscreenDemo',
    //   mode: LoadingMode.Determinate,
    //   type: LoadingType.Linear,
    //   value : this.avancement,
    //   color: 'accent',
    // });
  }

  toggleDisabled(): void {
    this.disabled = !this.disabled;
  }


  ngOnInit() {
  }

  //upload du fichier
  onSubmit() {
    this.avancement = 0;
    this.dataUploading = true;
    var self = this;
    this._uploadService.upload(this.files, function (ev) {
      //calcul du pourcentage d'avancement de l'upload du fichier
      var total = ev.total;
      var loaded = ev.loaded;
      self.avancement = Math.ceil((loaded / total) * 100);
      console.log("Avancement : ", self.avancement);
    }).subscribe(
      success => {
        this.dataUploading = false;
        console.log('SUCCES UPLOAD');
      },
      err => {
        this.dataUploading = false;
        console.log('ERREUR UPLOAD', err);
      });
  }

  download() {

  }

}
