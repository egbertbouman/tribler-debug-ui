import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TriblerService } from '../tribler.service';
import Utils from '../shared/utils';

@Component({
  selector: 'app-dowloads',
  template: '<app-table [columns]="columns" [data]="data"></app-table>',
})
export class DownloadsComponent implements OnInit, OnDestroy {

  columns = [{key: 'name', name: 'Name'},
             {key: 'infohash', name: 'Infohash', track: true},
             {key: 'status', name: 'Status'},
             {key: 'progress', name: 'Progress', transform(v) {return (v*100).toFixed() + '%'; }},
             {key: 'hops', name: '#Hops'},
             {key: 'speed_up', name: 'Speed up', transform(v) {return Utils.formatBytes(v) + '/s'; }},
             {key: 'speed_down', name: 'Speed down', transform(v) {return Utils.formatBytes(v) + '/s'; }}];
  data = [];

  private subscription: Subscription;

  constructor(public triblerService: TriblerService) { }

  ngOnInit() {
    this.subscription = timer(0, 1000)
      .pipe(switchMap(_ =>
        this.triblerService.getDownloads()
      ))
      .subscribe(data => {
        this.data = data;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
