import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IPV8Service } from '../ipv8.service';
import Utils from '../shared/utils';

@Component({
  selector: 'app-exits',
  template: '<app-table [columns]="columns" [data]="data"></app-table>'
})
export class ExitsComponent implements OnInit, OnDestroy {

  columns = [{key: 'circuit_from', name: 'Circuit ID', track: true},
             {key: 'enabled', name: 'Enabled?'},
             {key: 'bytes_up', name: 'Upload', transform: Utils.formatBytes},
             {key: 'bytes_down', name: 'Download', transform: Utils.formatBytes},
             {key: 'creation_time', name: 'Creation time', transform: Utils.formatTimeDiff}]
  displayedColumns = this.columns.map(c => c.key);
  data = [];

  private subscription: Subscription;

  constructor(public ipv8Service: IPV8Service) { }

  ngOnInit() {
    this.subscription = timer(0, 1000)
      .pipe(switchMap(_ =>
        this.ipv8Service.getExits()
      ))
      .subscribe(data => {
        this.data = data;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
