import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ipv8',
  templateUrl: './../shared/tabs.html'
})
export class Ipv8Component implements OnInit {

  rootUrl = '/ipv8';
  navLinks = [{ name: 'General', link: '/ipv8-stats' },
              { name: 'Overlays', link: '/overlays' },
              { name: 'Details', link: '/overlay-stats' }];

  constructor(public router: Router) {
  }

  ngOnInit(): void {
  }

}
