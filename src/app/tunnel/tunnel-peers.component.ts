import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IPV8Service } from '../ipv8.service';
import Utils from '../shared/utils';

@Component({
  selector: 'app-tunnel-peers',
  template: '<app-table [columns]="columns" [data]="data"></app-table>'
})
export class TunnelPeersComponent implements OnInit, OnDestroy {

  columns = [{key: 'address', name: 'Peer address'},
             {key: 'mid', name: 'MID', track: true},
             {key: 'is_key_compatible', name: 'Key compatible?'},
             {key: 'flags', name: 'Flags', transform: Utils.formatFlags}];
  data = [];

  private subscription: Subscription;

  constructor(public ipv8Service: IPV8Service) { }

  ngOnInit() {
    this.subscription = timer(0, 1000)
      .pipe(switchMap(_ =>
        this.ipv8Service.getTunnelPeers()
      ))
      .subscribe(data => {
        this.data = data;

        let entry;
        for (entry of data) {
          entry.address = entry.ip + ':' + entry.port;
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
