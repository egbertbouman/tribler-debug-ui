import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TriblerService } from '../tribler.service';

@Component({
  selector: 'app-threads',
  template: '<app-table [columns]="columns" [data]="data"></app-table>'
})
export class ThreadsComponent implements OnInit, OnDestroy {

  columns = [{key: 'thread_id', name: 'Thread ID', track: true, width: '100px'},
             {key: 'thread_name', name: 'Thread name', width: '200px'},
             {key: 'frames', name: 'Frames', transform(v) {return JSON.stringify(v, null, '  '); }}];
  data = [];

  private subscription: Subscription;

  constructor(public triblerService: TriblerService) { }

  ngOnInit() {
    this.subscription = timer(0, 1000)
      .pipe(switchMap(_ =>
        this.triblerService.getThreads()
      ))
      .subscribe(data => {
        this.data = data;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
