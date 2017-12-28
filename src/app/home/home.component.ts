import { Component, OnInit, Input } from '@angular/core';
import { UserDataService } from '../-services/user-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private user : any = {};

  constructor(
    private _userDataService : UserDataService
  ) { }

  ngOnInit() {
    this.user = this._userDataService.getUser();
  }

}
