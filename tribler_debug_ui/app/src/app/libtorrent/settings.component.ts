import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TriblerService } from '../tribler.service';

@Component({
  selector: 'app-settings',
  template: `
    <mat-form-field style="margin-left:16px; margin-top:10px;">
      <mat-label>Hop count</mat-label>
        <mat-select [(value)]="hops" (selectionChange)="onHopsChange()">
          <mat-option *ngFor="let h of [0, 1, 2, 3]" [value]="h">
          {{h}}
        </mat-option>
      </mat-select>
    </mat-form-field>
    <app-table [columns]="columns" [data]="data"></app-table>
  `
})
export class SettingsComponent implements OnInit, OnDestroy {

  columns = [{key: 'key', name: 'Key'},
             {key: 'value', name: 'Value'}];
  data = [];
  hops = 0;

  private subscription: Subscription;

  constructor(public triblerService: TriblerService) { }

  ngOnInit() {
    this.startTimer();
  }

  startTimer() {
    this.subscription = timer(0, 5000)
      .pipe(switchMap(_ =>
        this.triblerService.getLibtorrentSettings(this.hops)
      ))
      .subscribe(data => {
        const newData = [];
        for (const key of Object.keys(data)) {
          newData.push({key, value: data[key]});
        }
        this.data = newData;
      });
  }

  onHopsChange() {
    this.subscription.unsubscribe();
    this.startTimer();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
