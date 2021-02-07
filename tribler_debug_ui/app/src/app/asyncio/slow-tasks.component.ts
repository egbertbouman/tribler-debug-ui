import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IPV8Service } from '../ipv8.service';
import Utils from '../shared/utils';

@Component({
  selector: 'app-slow-tasks',
  template: `
    <div class="tab-body">
      <div>
        <mat-slide-toggle [checked]="enabled" (change)="enableDebugMode($event.checked)">Enable debug mode</mat-slide-toggle>
      </div>
      <br>
      <div>
        <mat-form-field>
          <mat-label>Slowness threshold</mat-label>
          <input matInput type="number" [value]="slownessThreshold" (input)="inputSlownessThreshold($event.target.value)" required>
        </mat-form-field>
        &nbsp;<button mat-stroked-button (click)="setSlownessThreshold()">Set</button>
      </div>
    </div>
    <app-table [columns]="columns" [data]="data"></app-table>
  `
})
export class SlowTasksComponent implements OnInit, OnDestroy {

  columns = [{key: 'message', name: 'Debug message', transform: Utils.encodeHTML}];
  data = [];
  enabled;
  slownessThreshold;

  private subscription: Subscription;

  constructor(public ipv8Service: IPV8Service) { }

  ngOnInit() {
    this.subscription = timer(0, 1000)
      .pipe(switchMap(_ =>
        this.ipv8Service.getAsyncioDebug()
      ))
      .subscribe(result => {
        this.data = result.messages;
        this.enabled = this.enabled || result.enable;
        this.slownessThreshold = this.slownessThreshold || result.slow_callback_duration;
      });
  }

  enableDebugMode(enable) {
    this.ipv8Service.setAsyncioDebug({enable}).subscribe(() => this.enabled = true);
  }

  inputSlownessThreshold(slownessThreshold) {
    this.slownessThreshold = parseFloat(slownessThreshold);
  }

  setSlownessThreshold() {
    this.ipv8Service.setAsyncioDebug({slow_callback_duration: this.slownessThreshold}).subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
