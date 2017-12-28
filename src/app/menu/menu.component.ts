import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
// import { setTimeout } from 'timers';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  private _sideNavOpened: boolean = false;
  @ViewChild('overlay') overlay: ElementRef;

  constructor(private rd: Renderer2) { }

  ngOnInit() {
    var self = this;
    var t = self.overlay.nativeElement.classList;

    console.log(t);
  }

  private _toggleSideNav() {
    console.log('toggle');
    this._sideNavOpened = !this._sideNavOpened;
  }

  private _closeSideNav(next) {
    this._sideNavOpened = false;
  }
}
