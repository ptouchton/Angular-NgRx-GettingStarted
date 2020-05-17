import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from './auth.service';
import { Store, select } from '@ngrx/store';
import * as fromUser from './state/user.reducer';
import * as fromUserActions from '../state/user.actions';
import { State } from '../state/app.state';
import { takeWhile } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  pageTitle = 'Log In';
  errorMessage: string;

  maskUserName: boolean;

  componentActive: boolean;

  constructor(private store: Store<State>,
              private authService: AuthService,
              private router: Router) {
  }
  ngOnDestroy(): void {
    this.componentActive = false;
  }

  ngOnInit(): void {

    this.componentActive = true;

    this.store.pipe(select(fromUser.getMaskUserName),
    takeWhile(() => this.componentActive))
    .subscribe(
      maskUserName => this.maskUserName = maskUserName);
  }

  cancel(): void {
    this.router.navigate(['welcome']);
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new fromUserActions.MaskUserName(value));

  }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/products']);
      }
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }
}
