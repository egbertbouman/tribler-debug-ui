import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TriblerService } from '../tribler.service';

@Component({
  selector: 'app-events',
  template: '<app-table [columns]="columns" [data]="data"></app-table>',
  styles: [':host ::ng-deep td:nth-child(1) { width: 175px; }',
           ':host ::ng-deep td:nth-child(2) { width: 125px; }',
           ':host ::ng-deep td:nth-child(3) { word-break: break-all; }']
})
export class EventsComponent implements OnInit, OnDestroy {

  columns = [{key: 'type', name: 'Type'},
             {key: 'time', name: 'Time'},
			 {key: 'event', name: 'Event', transform: JSON.stringify}]
  displayedColumns = this.columns.map(c => c.key);
  data = [];

  private subscription: Subscription;

  constructor(public triblerService: TriblerService) { }

  ngOnInit() {
    this.subscription = timer(0, 1000)
      .subscribe(data => {
		// TODO: somehow fix this
	    this.data = this.triblerService.events.slice();
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
