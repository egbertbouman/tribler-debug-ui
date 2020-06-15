import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IPV8Service } from '../ipv8.service';
import Utils from '../shared/utils';

@Component({
  selector: 'app-overlays',
  template: '<app-table [columns]="columns" [data]="data"></app-table>',
  styles: [':host /deep/ .green { color: #56F129 !important; }',
           ':host /deep/ .orange { color: #F4D03F; }',
           ':host /deep/ .red { color: #F12929; }']
})
export class OverlaysComponent implements OnInit, OnDestroy {

  columns = [{key: 'overlay_name', name: 'Name', track: true},
             {key: 'master_peer', name: 'Master peer', transform(v) {return v.slice(0, 10); }},
             {key: 'my_peer', name: 'My peer', transform(v) {return v.slice(0, 10); }},
             {key: 'peers', name: '#Peers'},
             {key: 'statistics.bytes_up', name: 'Upload', transform: Utils.formatBytes},
             {key: 'statistics.bytes_down', name: 'Download', transform: Utils.formatBytes},
             {key: 'statistics.num_up', name: '#Msgs sent'},
             {key: 'statistics.num_down', name: '#Msgs received'},
             {key: 'statistics.diff_time', name: 'Diff (sec)', transform: Utils.formatTime}];
  data = [];

  private subscription: Subscription;

  constructor(public ipv8Service: IPV8Service) {
    this.columns[3].transform = (a, b= undefined) => this.printPeerCount(a, b);
  }

  ngOnInit() {
    this.subscription = timer(0, 1000)
      .pipe(switchMap(_ =>
        this.ipv8Service.getOverlays()
      ))
      .subscribe(data => {
        this.data = data;
      });
  }

  printPeerCount(peers, overlay) {
   let limits = [20, 31];
   if (overlay.overlay_name === 'DiscoveryCommunity') {
      limits = [20, (this.data.length * 30 + 1)];
    }
    else if (overlay.overlay_name === 'DHTDiscoveryCommunity') {
      limits = [20, 61];
    }
    else if (overlay.overlay_name === 'RemoteQueryCommunity') {
      limits = [20, 51];
    }
   const color = peers.length < limits[0] ? 'orange' : (peers.length < limits[1] ? 'green' : 'red');
   return '<div class="' + color + '">' + peers.length + '</div>';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
