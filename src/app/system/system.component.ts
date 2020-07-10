import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css']
})
export class SystemComponent implements OnInit {

  rootUrl = '/system';
  navLinks = [{ name: 'Files', link: '/files' },
              { name: 'Sockets', link: '/sockets' },
              { name: 'Threads', link: '/threads' },
              { name: 'CPU', link: '/cpu' },
              { name: 'Memory', link: '/memory' },
              { name: 'Profiler', link: '/profiler' }];

  constructor(public router: Router) {
  }

  ngOnInit(): void {
  }

}
