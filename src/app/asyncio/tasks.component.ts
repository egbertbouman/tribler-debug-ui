import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IPV8Service } from '../ipv8.service';
import Utils from '../shared/utils';

@Component({
  selector: 'app-tasks',
  template: '<app-table [columns]="columns" [data]="data" [undefinedStr]="\'\'"></app-table>'
})
export class TasksComponent implements OnInit, OnDestroy {

  columns = [{key: 'taskmanager', name: 'TaskManager class', width: '200px'},
             {key: 'name', name: 'Name', track: true},
             {key: 'running', name: 'Running?', width: '85px'},
             {key: 'interval', name: 'Interval', width: '85px'},
             {key: 'start_time', name: 'Uptime', width: '85px', transform(v) {return Utils.formatTimeDiff(v); }}];
  data = [];

  private subscription: Subscription;

  constructor(public ipv8Service: IPV8Service) { }

  ngOnInit() {
    this.subscription = timer(0, 5000)
      .pipe(switchMap(_ =>
        this.ipv8Service.getTasks()
      ))
      .subscribe(data => {
        this.data = data;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
