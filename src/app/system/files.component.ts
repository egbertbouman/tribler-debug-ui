import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TriblerService } from '../tribler.service';

@Component({
  selector: 'app-files',
  template: '<app-table [columns]="columns" [data]="data"></app-table>'
})
export class FilesComponent implements OnInit, OnDestroy {
	
  columns = [{key: 'path', name: 'Path', track: true},
             {key: 'fd', name: 'File descriptor index'}]
  displayedColumns = this.columns.map(c => c.key);
  data = [];
  
  private subscription: Subscription;
  
  constructor(public triblerService: TriblerService) { }

  ngOnInit() {
    this.subscription = timer(0, 1000)
      .pipe(switchMap(_ =>
        this.triblerService.getOpenFiles()
      ))
      .subscribe(data => {
        this.data = data;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
