import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IPV8Service } from '../ipv8.service';

@Component({
  selector: 'app-dht-stats',
  template: '<app-table [columns]="columns" [data]="data"></app-table>'
})
export class DHTStatsComponent implements OnInit, OnDestroy {

  columns = [{key: 'key', name: 'Key', width: '300px'},
             {key: 'value', name: 'Value'}];
  data = [];

  private subscription: Subscription;

  constructor(public ipv8Service: IPV8Service) { }

  ngOnInit() {
    this.subscription = timer(0, 1000)
      .pipe(switchMap(_ =>
        this.ipv8Service.getDHTStatistics()
      ))
      .subscribe(data => {
        let ipv4Endpoint;
        for (const ep of data.endpoints) {
          if (ep.endpoint === 'UDPIPv4') {
            ipv4Endpoint = ep;
          }
        }
        this.data = [{key: 'Peer ID', value: data.peer_id},
                     {key: 'Node ID (IPv4)', value: ipv4Endpoint?.node_id},
                     {key: 'Routing table size (IPv4)', value: ipv4Endpoint?.routing_table_size},
                     {key: 'Routing table buckets (IPv4)', value: ipv4Endpoint?.routing_table_buckets},
                     {key: 'Key store size (IPv4)', value: ipv4Endpoint?.num_keys_in_store},
                     {key: 'Number of tokens', value: data.num_tokens},
                     {key: 'Number of peers in store', value: JSON.stringify(data.num_peers_in_store, null, '  ')},
                     {key: 'Number of peers storing me', value: JSON.stringify(data.num_store_for_me, null, '  ')}];
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
