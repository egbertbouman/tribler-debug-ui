import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TriblerService } from '../tribler.service';

@Component({
  selector: 'app-events',
  template: '<app-table [columns]="columns" [data]="data"></app-table>'
})
export class EventsComponent implements OnInit, OnDestroy {

  columns = [{key: 'type', name: 'Type', width: '175px'},
             {key: 'time', name: 'Time', width: '125px'},
             {key: 'event', name: 'Event', transform: JSON.stringify}];
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
