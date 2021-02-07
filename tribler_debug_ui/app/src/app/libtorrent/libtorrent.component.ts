import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-libtorrent',
  templateUrl: './../shared/tabs.html'
})
export class LibtorrentComponent implements OnInit {

  rootUrl = '/libtorrent';
  navLinks = [{ name: 'Settings', link: '/settings' },
              { name: 'Session', link: '/session' }];

  constructor(public router: Router) {
  }

  ngOnInit(): void {
  }

}
