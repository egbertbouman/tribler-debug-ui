import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IPV8Service } from '../ipv8.service';
import Utils from '../shared/utils';

@Component({
  selector: 'app-circuits',
  template: '<app-table [columns]="columns" [data]="data"></app-table>'
})
export class CircuitsComponent implements OnInit, OnDestroy {
	
  columns = [{key: 'circuit_id', name: 'Circuit ID', track: true},
             {key: 'type', name: 'Type'},
             {key: 'hops', name: 'Hops'},
             {key: 'state', name: 'State'},
             {key: 'bytes_up', name: 'Upload', transform: Utils.formatBytes},
             {key: 'bytes_down', name: 'Download', transform: Utils.formatBytes},
			 {key: 'creation_time', name: 'Uptime', transform: Utils.formatTimeDiff},
			 {key: 'exit_flags', name: 'Flags', transform: Utils.formatFlags}]
  displayedColumns = this.columns.map(c => c.key);
  data = [];

  private subscription: Subscription;

  constructor(public ipv8Service: IPV8Service) { }

  ngOnInit() {
    this.subscription = timer(0, 1000)
      .pipe(switchMap(_ =>
        this.ipv8Service.getCircuits()
      ))
      .subscribe(data => {
        this.data = data;
		
		var entry;
		for (entry of data)
          entry['hops'] = entry.actual_hops + '/' + entry.goal_hops;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
