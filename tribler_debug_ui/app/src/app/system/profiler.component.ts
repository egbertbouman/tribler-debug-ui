import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TriblerService } from '../tribler.service';

@Component({
  selector: 'app-profiler',
  template: `
    <div style="margin-left:16px; margin-top:10px; margin-bottom:20px;">
      <mat-slide-toggle [checked]="enabled" (change)="enableProfiler($event.checked)">Enable profiler</mat-slide-toggle>
      <div style="margin-top:15px" *ngIf="profilerFile">Profiler results saved to: {{ profilerFile }}</div>
    </div>
  `
})
export class ProfilerComponent implements OnInit, OnDestroy {

  profilerFile = '';
  enabled = false;

  constructor(public triblerService: TriblerService) { }

  ngOnInit() {
    this.triblerService.getProfilerState().subscribe((state) => this.enabled = state === 'STARTED');
  }

  enableProfiler(enable) {
    if (enable) {
      this.triblerService.startProfiler().subscribe((success) => this.profilerFile = '');
    }
    else {
      this.triblerService.stopProfiler().subscribe((profilerFile) => this.profilerFile = profilerFile);
    }
  }

  ngOnDestroy() {
  }
}
