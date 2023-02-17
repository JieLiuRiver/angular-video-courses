import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, of, finalize, tap } from 'rxjs';
import { LoadingService } from '../loading/loading.service';
import {
  AuthenticationService,
  ILoginResponse,
  TOKEN_STORAGE_KEY,
  USERINFO_STORAGE_KEY,
} from '../services/authentication.service';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { saveIsAuthenticated, saveToken } from '../store/auth/auth.actions';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private route: Router,
    public loadingService: LoadingService,
    private store: Store<AppState>,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  async onPressLogin() {
    if (!this.form.valid) return;
    const { userName, password } = this.form.value;
    this.loadingService.toggleLoading(true);
    this.authenticationService
      .login(userName, password)
      .pipe(
        catchError((error) => {
          const result: ILoginResponse = { fakeToken: null };
          if (error.status === 401) {
            alert(error.error);
            return of(result);
          }
          return of(result);
        }),
        switchMap((data) => {
          if (data?.token) {
            window.localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
            return this.authenticationService.getUserInfo().pipe(
              tap((userInfoData) => {
                window.localStorage.setItem(
                  USERINFO_STORAGE_KEY,
                  JSON.stringify(userInfoData)
                );
              })
            );
          }
          return of(null);
        }),
        finalize(() => this.loadingService.toggleLoading(false))
      )
      .subscribe((data) => {
        window.localStorage.setItem(TOKEN_STORAGE_KEY, data?.fakeToken || '');
        this.store.dispatch(saveIsAuthenticated({ payload: true }));
        this.store.dispatch(saveToken({ payload: data?.fakeToken || '' }));
        this.route.navigate(['courses']);
      });
  }
}
