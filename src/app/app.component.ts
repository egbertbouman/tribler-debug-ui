import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TriblerService } from './tribler.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tribler-debug-ui';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private dialog: MatDialog,
              private triblerService: TriblerService,
              private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.triblerService.getState()
      .subscribe(
        () => { },
        response => {
          if (response.status === 401) {
            this.showLoginDialog();
          }
        }
      );
  }

  public showLoginDialog() {
    this.dialog.open(LoginComponent);
  }
}
