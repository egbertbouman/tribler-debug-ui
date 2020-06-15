import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TriblerService } from '../tribler.service';
import Utils from '../shared/utils';

@Component({
  selector: 'app-trustchain-stats',
  template: '<app-table [columns]="columns" [data]="data"></app-table>'
})
export class TrustchainStatsComponent implements OnInit, OnDestroy {

  columns = [{key: 'key', name: 'Key', width: '300px'},
             {key: 'value', name: 'Value'}];
  data = [];

  private subscription: Subscription;

  constructor(public triblerService: TriblerService) { }

  ngOnInit() {
    this.subscription = timer(0, 5000)
      .pipe(switchMap(_ =>
        this.triblerService.getTrustchainStatistics()
      ))
      .subscribe(data => {
        this.data = [{key: 'Public key', value: data.id},
                     {key: 'Peers that you helped', value: data.peers_that_pk_helped},
                     {key: 'Peers that helped you', value: data.peers_that_helped_pk},
                     {key: 'Total blocks', value: data.total_blocks},
                     {key: 'Total up', value: Utils.formatBytes(data.total_up)},
                     {key: 'Total down', value: Utils.formatBytes(data.total_down)}];
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
