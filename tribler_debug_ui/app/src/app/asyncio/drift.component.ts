import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IPV8Service } from '../ipv8.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import Utils from '../shared/utils';

@Component({
  selector: 'app-drift',
  template: `
  <div style="margin-left:16px; margin-top:10px; margin-bottom:20px;">
    <div>median: {{ median.toFixed(2) }} ms</div>
    <div>average: {{ average.toFixed(2) }} ms</div>
  </div>
  <div class="chart-wrapper">
    <canvas baseChart
        [datasets]="lineChartData"
        [labels]="lineChartLabels"
        [options]="lineChartOptions"
        [colors]="lineChartColors"
        [legend]="false"
        chartType="line">
    </canvas>
  </div>
  `,
})
export class DriftComponent implements OnInit, OnDestroy {

  lineChartData: ChartDataSets[] = [{ data: [], label: 'Asyncio drift', borderWidth: 0, pointRadius: 0 }];
  lineChartLabels: Label[] = [];
  lineChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        type: 'time',
        ticks: {
          maxTicksLimit: 10,
        },
        time: {
          format: 'X',
          displayFormats: {millisecond: 'HH:mm:ss',
                           second: 'HH:mm:ss',
                           minute: 'HH:mm:ss'},
        },
      }],
      yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Asyncio drift (ms)',
          },
          ticks: {
            beginAtZero: true,
          },
      }]
    }
  };
  lineChartColors: Color[] = [{ borderColor: 'black', backgroundColor: 'rgba(63,81,181,0.28)' }];

  median = 0;
  average = 0;

  private subscription: Subscription;

  constructor(public ipv8Service: IPV8Service) { }

  ngOnInit() {
    this.ipv8Service.enableDrift(true)
      .subscribe(success => {
        this.subscription = timer(0, 1000)
          .pipe(switchMap(_ =>
            this.ipv8Service.getDrift()
          ))
          .subscribe(data => {
            this.lineChartData[0].data.length = 0;
            this.lineChartLabels.length = 0;
            for (const entry of data) {
              entry.timestamp = 1000 * entry.timestamp;
              this.lineChartData[0].data.push(entry.drift * 1000);
              this.lineChartLabels.push(entry.timestamp);
            }

            if (this.lineChartData[0].data.length > 0) {
              this.median = Utils.median(...this.lineChartData[0].data);
              this.average = Utils.average(...this.lineChartData[0].data);
            }
          });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.ipv8Service.enableDrift(false).subscribe(success => {});
  }
}
