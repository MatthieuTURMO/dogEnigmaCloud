import { Component, OnInit, OnDestroy } from '@angular/core';


import 'jquery';
import 'fullpage.js';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.resizeWindow();
  }

  ngOnDestroy() {
    //destroying
    if (typeof $.fn.fullpage.destroy == 'function') {
      $.fn.fullpage.destroy('all');
    }
  }

  private destroyAndReload(next) {
    if (typeof $.fn.fullpage.destroy == 'function') {
      $.fn.fullpage.destroy('all');
      next();
    }
  }

  private resizeWindow() {
    console.log('resize')
    var self = this;
    $(document).resize(function (event) {
      self.destroyAndReload(function () {
        $('.under-nav').fullpage();
      });
    });
  }

}
