import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IPV8Service } from '../ipv8.service';
import Utils from '../shared/utils';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-overlay-peers',
  template: '<app-table [columns]="columns" [data]="data"></app-table>'
})
export class OverlayPeersComponent implements OnInit, OnDestroy {

  @Input() id = '';
  columns = [{key: 'ip', name: 'IP'},
             {key: 'port', name: 'Port'},
             {key: 'public_key', name: 'MID', track: true, transform: Utils.publicKeyToMid}];
  data = [];

  private subscription: Subscription;

  constructor(public ipv8Service: IPV8Service) { }

  ngOnInit() {
    this.subscription = timer(0, 1000)
      .pipe(switchMap(_ =>
        this.ipv8Service.getOverlays()
      ))
      .subscribe(data => {
        let entry;
        for (entry of data) {
          if (entry.id === this.id) {
            this.data = entry.peers;
          }
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
