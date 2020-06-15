import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IPV8Service } from '../ipv8.service';
import Utils from '../shared/utils';

@Component({
  selector: 'app-overlays',
  template: '<app-table [columns]="columns" [data]="data"></app-table>'
})
export class OverlaysComponent implements OnInit, OnDestroy {

  columns = [{key: 'overlay_name', name: 'Name', track: true},
             {key: 'master_peer', name: 'Master peer', transform: function(v) {return v.slice(0, 10)}},
             {key: 'my_peer', name: 'My peer', transform: function(v) {return v.slice(0, 10)}},
             {key: 'peers', name: '#Peers', transform: function(v) {return v.length}},
             {key: 'statistics.bytes_up', name: 'Upload', transform: Utils.formatBytes},
             {key: 'statistics.bytes_down', name: 'Download', transform: Utils.formatBytes},
             {key: 'statistics.num_up', name: 'Msg sent'},
             {key: 'statistics.num_down', name: 'Msg received'},
             {key: 'statistics.diff_time', name: 'Diff (sec)', transform: Utils.formatTime}]
  displayedColumns = this.columns.map(c => c.key);
  data = [];

  private subscription: Subscription;

  constructor(public ipv8Service: IPV8Service) { }

  ngOnInit() {
    this.subscription = timer(0, 1000)
      .pipe(switchMap(_ =>
        this.ipv8Service.getOverlays()
      ))
      .subscribe(data => {
        this.data = data;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
