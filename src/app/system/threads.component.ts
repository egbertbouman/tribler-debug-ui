import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TriblerService } from '../tribler.service';

@Component({
  selector: 'app-threads',
  template: '<app-table [columns]="columns" [data]="data"></app-table>',
  styles: [':host ::ng-deep td:nth-child(1) { width: 100px; }',
           ':host ::ng-deep td:nth-child(2) { width: 200px; }',
		   ':host ::ng-deep td:nth-child(3) { word-break: break-all; }']
})
export class ThreadsComponent implements OnInit, OnDestroy {
	
  columns = [{key: 'thread_id', name: 'Thread ID', track: true},
             {key: 'thread_name', name: 'Thread name'},
			 {key: 'frames', name: 'Frames', transform: function(v) {return '<div style="white-space: pre-wrap;">' + JSON.stringify(v, null, '  ') + '</div>';}}]
  displayedColumns = this.columns.map(c => c.key);
  data = [];
  
  private subscription: Subscription;
  
  constructor(public triblerService: TriblerService) { }

  ngOnInit() {
    this.subscription = timer(0, 1000)
      .pipe(switchMap(_ =>
        this.triblerService.getThreads()
      ))
      .subscribe(data => {
        this.data = data;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
