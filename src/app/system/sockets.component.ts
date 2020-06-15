import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TriblerService } from '../tribler.service';

@Component({
  selector: 'app-sockets',
  template: '<app-table [columns]="columns" [data]="data"></app-table>'
})
export class SocketsComponent implements OnInit, OnDestroy {

  columns = [{key: 'laddr', name: 'Local address', track: true},
             {key: 'raddr', name: 'Remote address'},
             {key: 'family', name: 'Family'},
             {key: 'type', name: 'Type'},
             {key: 'status', name: 'Status'}];
  data = [];

  private subscription: Subscription;

  constructor(public triblerService: TriblerService) { }

  ngOnInit() {
    this.subscription = timer(0, 1000)
      .pipe(switchMap(_ =>
        this.triblerService.getOpenSockets()
      ))
      .subscribe(data => {
        this.data = data;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
