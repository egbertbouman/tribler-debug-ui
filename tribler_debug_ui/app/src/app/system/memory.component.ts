import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TriblerService } from '../tribler.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-memory',
  template: `
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
  `
})
export class MemoryComponent implements OnInit, OnDestroy {

  lineChartData: ChartDataSets[] = [{ data: [], label: 'Memory Usage', borderWidth: 1, pointRadius: 2 }];
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
            labelString: 'Memory Usage (MB)',
          },
          ticks: {
            beginAtZero: true,
          },
      }]
    }
  };
  lineChartColors: Color[] = [{ borderColor: 'black', backgroundColor: 'rgba(63,81,181,0.28)' }];

  private subscription: Subscription;

  constructor(public triblerService: TriblerService) { }

  ngOnInit() {
    this.subscription = timer(0, 5000)
      .pipe(switchMap(_ =>
        this.triblerService.getMemoryHistory()
      ))
      .subscribe(data => {
        if (this.lineChartData[0].data.length === 0) {
          for (const entry of data) {
            this.addEntry(entry);
          }
        }
        else {
            this.addEntry(data[data.length - 1]);
        }
      });
  }

  addEntry(entry) {
    entry.time = 1000 * entry.time;
    entry.mem = entry.mem / (1024 * 1024);

    this.lineChartData[0].data.push(entry.mem);
    this.lineChartLabels.push(entry.time);

    if (this.lineChartData[0].data.length > 60) {
      this.lineChartData[0].data.splice(0, this.lineChartData[0].data.length - 60);
      this.lineChartLabels.splice(0, this.lineChartLabels.length - 60);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
