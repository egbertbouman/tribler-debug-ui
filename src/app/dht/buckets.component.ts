import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IPV8Service } from '../ipv8.service';
import Utils from '../shared/utils';

@Component({
  selector: 'app-buckets',
  template: '<app-table [columns]="columns" [data]="data"></app-table>'
})
export class BucketsComponent implements OnInit, OnDestroy {

  columns = [{key: 'prefix', name: 'Prefix', track: true},
             {key: 'endpoint', name: 'Type'},
             {key: 'last_changed', name: 'Last changed', transform: Utils.formatTimeDiff},
             {key: 'peers', name: '#Peers', transform(v) {return v.length; }}];
  data = [];

  private subscription: Subscription;

  constructor(public ipv8Service: IPV8Service) { }

  ngOnInit() {
    this.subscription = timer(0, 1000)
      .pipe(switchMap(_ =>
        this.ipv8Service.getBuckets()
      ))
      .subscribe(data => {
        this.data = data;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
