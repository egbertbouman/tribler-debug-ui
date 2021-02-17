import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IPV8Service } from '../ipv8.service';
import Utils from '../shared/utils';

@Component({
  selector: 'app-overlays',
  template: `
    <app-table hoverable="true" [columns]="overlayColumns" [data]="data" (rowClick)="onRowClicked($event)"></app-table>
    <div *ngIf="selectedOverlay">
      <div style="margin-left:16px; margin-top:20px;">Peers that are in {{ selectedOverlay.overlay_name }}:</div>
      <app-table hoverable="true" [columns]="peerColumns" [data]="selectedOverlay.peers"></app-table>
      <div style="margin-left:16px; margin-top:20px;">Strategies used by {{ selectedOverlay.overlay_name }}:</div>
      <app-table hoverable="true" [columns]="strategyColumns" [data]="selectedOverlay.strategies"></app-table>
    </div>
  `,
  styles: [':host /deep/ .green { color: #56F129 !important; }',
           ':host /deep/ .orange { color: #F4D03F; }',
           ':host /deep/ .red { color: #F12929; }']
})
export class OverlaysComponent implements OnInit, OnDestroy {

  overlayColumns = [{key: 'overlay_name', name: 'Name', track: true},
                    {key: 'id', name: 'Community ID', transform(v) {return v.slice(0, 10); }},
                    {key: 'my_peer', name: 'My peer', transform(v) {return v.slice(0, 10); }},
                    {key: 'peers', name: '#Peers'},
                    {key: 'statistics.bytes_up', name: 'Upload', transform: Utils.formatBytes},
                    {key: 'statistics.bytes_down', name: 'Download', transform: Utils.formatBytes},
                    {key: 'statistics.num_up', name: '#Msgs sent'},
                    {key: 'statistics.num_down', name: '#Msgs received'},
                    {key: 'statistics.diff_time', name: 'Diff (sec)', transform: Utils.formatTime}];
  peerColumns = [{key: 'ip', name: 'IP'},
                 {key: 'port', name: 'Port'},
                 {key: 'public_key', name: 'MID', track: true, transform: Utils.publicKeyToMid}];
  strategyColumns = [{key: 'name', name: 'Strategy name', track: true},
                     {key: 'target_peers', name: 'Target #peers'}];
  data = [];
  selectedOverlay;

  private subscription: Subscription;

  constructor(public ipv8Service: IPV8Service) {
    this.overlayColumns[3].transform = (a, b= undefined) => this.printPeerCount(a, b);
  }

  ngOnInit() {
    this.subscription = timer(0, 1000)
      .pipe(switchMap(_ =>
        this.ipv8Service.getOverlays()
      ))
      .subscribe(data => {
        this.data = data;

        let entry;
        for (entry of data) {
          if (entry.id === this.selectedOverlay?.id) {
            this.selectedOverlay = entry;
            this.selectedOverlay.selected = true;
          }
        }
      });
  }

  printPeerCount(peers, overlay) {
   const color = peers.length < 20 ? 'orange' : (peers.length < overlay.max_peers ? 'green' : 'red');
   return '<div class="' + color + '">' + peers.length + '</div>';
  }

  onRowClicked(overlay) {
    if (this.selectedOverlay) {
      this.selectedOverlay.selected = false;
    }
    if (this.selectedOverlay !== overlay) {
      this.selectedOverlay = overlay;
      this.selectedOverlay.selected = true;
    }
    else {
      this.selectedOverlay = undefined;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
