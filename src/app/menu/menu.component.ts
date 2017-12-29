import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
// import { setTimeout } from 'timers';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

import * as $ from 'jquery';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [
    trigger('myAwesomeAnimation', [
      state('close', style({
        width: '100%',
        "margin-left" : 0
      })),
      state('open', style({
        width: 'calc(100% - 250px)',
        "margin-left" : "250px",
      })),
      transition('close => open', animate('300ms ease-in')),
      transition('open => close', animate('300ms ease-in')),
    ]),
  ]
})
export class MenuComponent implements OnInit {

  private _sideNavOpened: boolean = false;
  @ViewChild('overlay') overlay: ElementRef;
  @ViewChild('testAnimation') testAnimation: ElementRef;
  private sideNavState: string = 'close';

  constructor(private rd: Renderer2) { }

  ngOnInit() {
    this.detectScroll(64, 20);
  }

  animateSideNav() {
    this.sideNavState = (this.sideNavState === 'close' ? 'open' : 'close');
  }

  //AFFICHE / DESAFFICHE LE SIDENAV MENU
  private _toggleSideNav($event) {
    // on toggle sur l'overlay uniquement s'il est ouvert, sinon on ne fait rien
    if (!$event.srcElement.classList.contains('overlay-side-nav') || this._sideNavOpened) {
      this._sideNavOpened = !this._sideNavOpened;
    }
  }

  //en fonction du scroll, affiche ou non la top menu bar
  private detectScroll(offsetUp, offsetDown) {
    var lastScrollTop = 0;
    $(window).scroll(function (event) {
      var scrollLevel = $(this).scrollTop();
      if (scrollLevel > lastScrollTop + offsetUp) {
        lastScrollTop = scrollLevel;
        $('nav.top-menu').css('top', '-64px');
      } else if (scrollLevel < lastScrollTop - offsetDown) {
        $('nav.top-menu').css('top', '0');
        lastScrollTop = scrollLevel;
      }
    });
  }
}
