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
  }

  //AFFICHE / DESAFFICHE LE SIDENAV MENU
  private _toggleSideNav($event) {
    // on toggle sur l'overlay uniquement s'il est ouvert, sinon on ne fait rien
    if (!$event.srcElement.classList.contains('overlay-side-nav') || this._sideNavOpened) {
      this._sideNavOpened = !this._sideNavOpened;
    } 
  }
}
