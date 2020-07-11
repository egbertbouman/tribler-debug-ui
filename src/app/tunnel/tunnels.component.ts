import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tunnels',
  templateUrl: './../shared/tabs.html'
})
export class TunnelsComponent implements OnInit {

  rootUrl = '/tunnel';
  navLinks = [{ name: 'Circuits', link: '/circuits' },
              { name: 'Relays', link: '/relays' },
              { name: 'Exits', link: '/exits' },
              { name: 'Swarms', link: '/swarms' },
              { name: 'Peers', link: '/peers' }];

  constructor(public router: Router) {
  }

  ngOnInit(): void {
  }

}
