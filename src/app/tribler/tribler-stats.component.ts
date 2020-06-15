import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TriblerService } from '../tribler.service';
import Utils from '../shared/utils';

@Component({
  selector: 'app-tribler-stats',
  template: '<app-table [columns]="columns" [data]="data"></app-table>'
})
export class TriblerStatsComponent implements OnInit, OnDestroy {

  columns = [{key: 'key', name: 'Key'},
             {key: 'value', name: 'Value'}]
  displayedColumns = this.columns.map(c => c.key);
  data = [];

  private subscription: Subscription;

  constructor(public triblerService: TriblerService) { }

  ngOnInit() {
    this.subscription = timer(0, 5000)
      .pipe(switchMap(_ =>
        this.triblerService.getTriblerStatistics()
      ))
      .subscribe(data => {
	    this.data = [{key: 'Database size', value: Utils.formatBytes(data.db_size)},
			         {key: 'Number of channels', value: data.num_channels},
				     {key: 'Number of known torrents', value: data.num_torrents}]
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
