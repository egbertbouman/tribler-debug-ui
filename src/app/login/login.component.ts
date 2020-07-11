import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public apiKey = '';

  constructor(private router: Router,
              private cookieService: CookieService,
              private dialogRef: MatDialogRef<LoginComponent>) {
  }

  ngOnInit(): void {
    this.apiKey = this.cookieService.get('api_key');
  }

  save() {
    this.cookieService.set('api_key', this.apiKey, 365, '/', null, false, 'Lax');
    this.dialogRef.close();
    window.location.reload(true); // tslint:disable-line
  }

  close() {
    this.dialogRef.close();
  }
}
