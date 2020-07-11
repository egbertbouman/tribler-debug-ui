import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IPV8Service } from '../ipv8.service';
import { ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import Utils from '../shared/utils';

@Component({
  selector: 'app-overlay-stats',
  template: `
  <mat-card style="margin:15px" *ngIf="statisticsEnabled === false">
    <div class="mat-card-header-text">Statistics seem to be disabled</div>
  </mat-card>
  <div *ngIf="statisticsEnabled === true">
    <div class="chart" style="margin-top:15px;" (mouseenter)="chartPaused=true" (mouseleave)="chartPaused=false" >
      <canvas baseChart
        [data]="chartData"
        [labels]="chartLabels"
        [options]="chartOptions"
        [colors]="chartColors"
        legend="true"
        height="400px"
        chartType="pie">
      </canvas>
    </div>
    <app-table [columns]="columns" [data]="data"></app-table>
  </div>
  `
})
export class OverlayStatsComponent implements OnInit, OnDestroy {

  chartData: number[] = [];
  chartLabels: Label[] = [];
  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: { position: 'bottom' },
    animation: { duration: 0 },
    hover: { animationDuration: 0 },
    responsiveAnimationDuration: 0
  };
  chartColors = [
    {
      // PiYG8 + RdBu8 color schemes
      backgroundColor: ['#c51b7d', '#de77ae', '#f1b6da', '#fde0ef', '#e6f5d0', '#b8e186', '#7fbc41', '#4d9221',
                        '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#d1e5f0', '#92c5de', '#4393c3', '#2166ac'],
    },
  ];
  chartPaused = false;


  columns = [{key: 'overlay_name', name: 'Overlay', width: '220px'},
             {key: 'message_name', name: 'Message'},
             {key: 'bytes_up', name: 'Upload', transform: Utils.formatBytes},
             {key: 'bytes_down', name: 'Download', transform: Utils.formatBytes},
             {key: 'num_up', name: '#Msgs sent'},
             {key: 'num_down', name: '#Msgs received'}];
  data = [];

  statisticsEnabled;

  private subscription: Subscription;

  constructor(public ipv8Service: IPV8Service) { }

  ngOnInit() {
    this.subscription = timer(0, 1000)
      .pipe(switchMap(_ =>
        this.ipv8Service.getOverlayStatistics()
      ))
      .subscribe(data => {
        this.data = this.processData(data);

        if (this.chartPaused) {
          // Due to a bug in chart.js tooltips will disappear after updating (should be fixed in v3.0.0)
          // To avoid the issue, we only update the chart when the mouse is elsewhere.
          return;
        }

        this.chartData.length = 0;
        this.chartLabels.length = 0;
        const newChartLabels = [];
        for (const entry of this.data) {
          if (entry.overlay_name !== '') {
            this.chartData.push(+((entry.bytes_down + entry.bytes_up) / (1024 * 1024)).toFixed(2));
            this.chartLabels.push(entry.overlay_name);
          }
        }
      });
  }

  processData(data) {
    let enabled = false;
    const newData = [];
    for (const entry of data) {
      const overlayName = Object.keys(entry)[0];
      const overlay = entry[overlayName];
      const index = newData.length;
      newData.push({overlay_name: overlayName,
                    message_name: 'all',
                    bytes_up: 0,
                    bytes_down: 0,
                    num_up: 0,
                    num_down: 0});
      for (const messageName of Object.keys(overlay)) {
        enabled = true;
        const message = overlay[messageName];
        message.overlay_name = '';
        message.message_name = messageName;
        newData[index].bytes_up += message.bytes_up;
        newData[index].bytes_down += message.bytes_down;
        newData[index].num_up += message.num_up;
        newData[index].num_down += message.num_down;
        newData.push(message);
      }
    }
    this.statisticsEnabled = enabled;
    return newData;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
