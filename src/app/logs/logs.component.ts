import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TriblerService } from '../tribler.service';

@Component({
  selector: 'app-logs',
  template: `
    <mat-form-field style="margin-left:16px; margin-top:10px;">
      <mat-label>Process</mat-label>
        <mat-select [(value)]="process" (selectionChange)="onProcessChange()">
          <mat-option *ngFor="let p of ['core', 'gui']" [value]="p">
          {{p}}
        </mat-option>
      </mat-select>
    </mat-form-field>
    <mat-card style="margin:15px">{{content}}</mat-card>
  `
})
export class LogsComponent implements OnInit, OnDestroy {

  content: string;
  process = 'core';

  private subscription: Subscription;

  constructor(public triblerService: TriblerService) { }

  ngOnInit() {
    this.startTimer();
  }

  startTimer() {
    this.subscription = timer(0, 5000)
      .pipe(switchMap(_ =>
        this.triblerService.getLog(this.process, 100)
      ))
      .subscribe(data => {
        this.content = data.content ? data.content : 'No logs found';
      });
  }

  onProcessChange() {
    this.subscription.unsubscribe();
    this.startTimer();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
