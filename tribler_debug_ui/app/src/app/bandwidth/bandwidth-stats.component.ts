import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TriblerService } from '../tribler.service';
import Utils from '../shared/utils';

@Component({
  selector: 'app-bandwidth-stats',
  template: '<app-table [columns]="columns" [data]="data"></app-table>'
})
export class BandwidthStatsComponent implements OnInit, OnDestroy {

  columns = [{key: 'key', name: 'Key', width: '300px'},
             {key: 'value', name: 'Value'}];
  data = [];

  private subscription: Subscription;

  constructor(public triblerService: TriblerService) { }

  ngOnInit() {
    this.subscription = timer(0, 5000)
      .pipe(switchMap(_ =>
        this.triblerService.getBandwidthStatistics()
      ))
      .subscribe(data => {
        this.data = [{key: 'Public key', value: data.id},
                     {key: 'Peers that you helped', value: data.num_peers_helped_by},
                     {key: 'Peers that helped you', value: data.num_peers_helped},
                     {key: 'Total given', value: Utils.formatBytes(data.total_given)},
                     {key: 'Total taken', value: Utils.formatBytes(data.total_taken)}];
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
