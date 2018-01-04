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

  onSubmit() {
    var self = this;
    this._uploadService.upload(this.files, function (ev) {
      console.log("La on est dans le component", ev);
      var total = ev.total;
      var loaded = ev.loaded;
      self.avancement = (loaded/total)*100;
      console.log(self.avancement);
    }).subscribe(
      success => {
        console.log('ok');
      },
      err => {
        console.log('error');
      }
      )
  }

}
