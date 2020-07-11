import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dht',
  templateUrl: './../shared/tabs.html'
})
export class DHTComponent implements OnInit {

  rootUrl = '/dht';
  navLinks = [{ name: 'General', link: '/dht-stats' },
              { name: 'Buckets', link: '/buckets' },
              { name: 'Request', link: '/request' }];

  constructor(public router: Router) {
  }

  ngOnInit(): void {
  }

}
