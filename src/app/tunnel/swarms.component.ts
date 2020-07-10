import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IPV8Service } from '../ipv8.service';
import Utils from '../shared/utils';

@Component({
  selector: 'app-swarms',
  template: '<app-table [columns]="columns" [data]="data"></app-table>'
})
export class SwarmsComponent implements OnInit, OnDestroy {

  columns = [{key: 'info_hash', name: 'Infohash', track: true},
             {key: 'num_seeders', name: '#Seeders'},
             {key: 'num_connections', name: '#Connections'},
             {key: 'num_connections_incomplete', name: '#Pending'},
             {key: 'seeding', name: 'Seeding?'},
             {key: 'last_lookup', name: 'Last lookup', transform: Utils.formatTimeDiff},
             {key: 'bytes_up', name: 'Upload', transform: Utils.formatBytes},
             {key: 'bytes_down', name: 'Download', transform: Utils.formatBytes}];
  data = [];

  private subscription: Subscription;

  constructor(public ipv8Service: IPV8Service) { }

  ngOnInit() {
    this.subscription = timer(0, 1000)
      .pipe(switchMap(_ =>
        this.ipv8Service.getSwarms()
      ))
      .subscribe(data => {
        this.data = data;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
