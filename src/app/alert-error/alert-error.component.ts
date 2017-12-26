import {
  Component,
  OnInit,
  Input,
  OnChanges
} from '@angular/core';

@Component({
  selector: 'app-alert-error',
  templateUrl: './alert-error.component.html',
  styleUrls: ['./alert-error.component.css']
})
export class AlertErrorComponent implements OnInit {

  @Input() error: any;
  private messageError: String;
  private show = true;
  constructor() { }

  ngOnInit() {
    this.parseError();
  }

  ngOnChanges() {
    this.show = true;
    this.parseError();
  }

  private parseError(){
    var body = JSON.parse(this.error._body);
    this.messageError = body.message;
  }

  private deleteThis(){
    this.show = false;
  }



}
