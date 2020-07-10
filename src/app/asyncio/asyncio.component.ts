import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-asyncio',
  templateUrl: './asyncio.component.html',
  styleUrls: ['./asyncio.component.css']
})
export class AsyncioComponent implements OnInit {

  rootUrl = '/asyncio';
  navLinks = [{ name: 'Drift', link: '/drift' },
              { name: 'All tasks', link: '/all-tasks' },
              { name: 'Slow tasks', link: '/slow-tasks' }];

  constructor(public router: Router) {
  }

   ngOnInit(): void {
  }
}
