import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IPV8Service } from '../ipv8.service';
import Utils from '../shared/utils';

@Component({
  selector: 'app-request',
  template: `
    <div class="tab-body">
      <mat-form-field style="width: 400px">
        <mat-label>Lookup hash</mat-label>
        <input matInput placeholder="Ex. e24d8e65a329a59b41a532ebd4eb4a3db7cb291b" [value]="hash" (input)="hash = $event.target.value" required>
      </mat-form-field>
      &nbsp;<button mat-stroked-button (click)="lookupHash()">Go!</button>

      <div *ngIf="busy">Loading... <img class="loading"></div>
      <div *ngIf="debug">DHT request completed in {{ debug.time.toFixed(2) }} seconds.</div>

      <div *ngIf="showGauges" class="gauges-container">

        <div style="text-align:center;">
          <mwl-gauge #neededGauge
            [max]="24"
            [dialStartAngle]="-90"
            [dialEndAngle]="-90.001"
            [value]="debug?.requests"
            [animated]="true"
            [animationDuration]="1">
          </mwl-gauge>
          Requests needed
        </div>

        <div style="text-align:center;">
          <mwl-gauge #successGauge
            class="green"
            [max]="24"
            [dialStartAngle]="-90"
            [dialEndAngle]="-90.001"
            [value]="debug?.responses"
            [animated]="true"
            [animationDuration]="1">
          </mwl-gauge>
          Requests successful
        </div>

        <div style="text-align:center;">
          <mwl-gauge #valuesGauge
            class="pink"
            [max]="24"
            [dialStartAngle]="-90"
            [dialEndAngle]="-90.001"
            [value]="debug?.responses_with_values"
            [animated]="true"
            [animationDuration]="1">
          </mwl-gauge>
          Value responses
        </div>

      </div>

      <div *ngIf="values && !busy" class="code">{{ prettyJSON(values) }}</div>

    </div>
  `
})
export class RequestComponent implements OnInit, OnDestroy {

  @ViewChild('neededGauge') neededGauge;
  @ViewChild('successGauge') successGauge;
  @ViewChild('valuesGauge') valuesGauge;

  hash = '';
  values;
  debug;
  busy = false;
  showGauges = false;
  prettyJSON = Utils.prettyJSON;

  constructor(public ipv8Service: IPV8Service) { }

  ngOnInit() {
  }

  lookupHash() {
    this.debug = undefined;
    this.showGauges = false;
    this.busy = true;
    this.ipv8Service.lookupDHTValue(this.hash).subscribe((result) => {
      this.showGauges = true;
      this.busy = false;
      this.values = result.values;
      // Delay setting debug to avoid losing the animation for the gauges
      const self = this;
      setTimeout(() => {
        self.debug = result.debug;
        self.successGauge.gauge.setMaxValue(self.debug.requests);
        self.valuesGauge.gauge.setMaxValue(self.debug.responses);
      }, 500);
    });
  }

  ngOnDestroy() {
  }
}
