import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IPV8Service } from '../ipv8.service';

@Component({
  selector: 'app-dht-stats',
  template: '<app-table [columns]="columns" [data]="data"></app-table>',
  styles: [':host ::ng-deep td:nth-child(1) { width: 300px; }',
           ':host ::ng-deep td:nth-child(2) { word-break: break-all; }']
})
export class DHTStatsComponent implements OnInit, OnDestroy {
	
  columns = [{key: 'key', name: 'Key'},
             {key: 'value', name: 'Value'}]
  displayedColumns = this.columns.map(c => c.key);
  data = [];

  private subscription: Subscription;

  constructor(public ipv8Service: IPV8Service) { }

  ngOnInit() {
    this.subscription = timer(0, 1000)
      .pipe(switchMap(_ =>
        this.ipv8Service.getDHTStatistics()
      ))
      .subscribe(data => {
	    this.data = [{key: 'Node ID', value: data.node_id},
			         {key: 'Peer ID', value: data.peer_id},
				     {key: 'Routing table size', value: data.routing_table_size},
					 {key: 'Routing table buckets', value: data.routing_table_buckets},
					 {key: 'Key store size', value: data.num_keys_in_store},
					 {key: 'Number of tokens', value: data.num_tokens},
					 {key: 'Number of peers in store', value: '<pre>' + JSON.stringify(data.num_peers_in_store, null, '  ') + '</pre>'},
					 {key: 'Number of peers storing me', value: '<pre>' + JSON.stringify(data.num_store_for_me, null, '  ') + '</pre>'}]
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
