import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TriblerService } from '../tribler.service';
import Utils from '../shared/utils';

@Component({
  selector: 'app-ipv8-stats',
  template: '<app-table [columns]="columns" [data]="data"></app-table>',
})
export class IPv8StatsComponent implements OnInit, OnDestroy {
	
  columns = [{key: 'key', name: 'Key'},
             {key: 'value', name: 'Value'}]
  displayedColumns = this.columns.map(c => c.key);
  data = [];

  private subscription: Subscription;

  constructor(public triblerService: TriblerService) { }

  ngOnInit() {
    this.subscription = timer(0, 5000)
      .pipe(switchMap(_ =>
        this.triblerService.getIPv8Statistics()
      ))
      .subscribe(data => {
	    this.data = [{key: 'Total bytes up', value: Utils.formatBytes(data.total_up)},
			         {key: 'Total bytes down', value: Utils.formatBytes(data.total_down)},
				     {key: 'Uptime', value: Utils.formatTime(data.session_uptime)}]
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
