import { catchError, Observable, of, throwError } from 'rxjs';
import { Injectable, Pipe } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import {
  saveIsAuthenticated,
  saveToken,
  saveUserInfo,
} from '../store/auth/auth.actions';
import { LocalStorageService } from './local-storage.service';

export const TOKEN_STORAGE_KEY = '__token__';
export const USERINFO_STORAGE_KEY = '__userinfo__';
export interface IUserInfo {
  id: number;
  token: string;
  fakeToken: string;
  name: {
    first: string;
    last: string;
  };
  login: string;
  password: string;
}

export interface ILoginResponse {
  token?: string | null;
  fakeToken?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    private localstorage: LocalStorageService
  ) {
    this.refresh();
  }

  refresh() {
    const token = this.localstorage.getItem(TOKEN_STORAGE_KEY);
    const userInfo = this.localstorage.getItem(USERINFO_STORAGE_KEY);
    this.store.dispatch(saveIsAuthenticated({ payload: !!token }));
    this.store.dispatch(saveToken({ payload: token || '' }));
    this.store.dispatch(
      saveUserInfo({ payload: JSON.parse(userInfo || '{}') })
    );
  }

  login(userName: string, password: string): Observable<ILoginResponse> {
    return this.http
      .post<ILoginResponse>('/api/auth/login', {
        login: userName,
        password,
      })
      .pipe(
        catchError((error) => {
          if (error.status === 401) {
            return throwError(() => error);
          }
          const result: ILoginResponse = { fakeToken: null };
          return of(result);
        })
      );
  }

  logout() {
    this.localstorage.removeItem(TOKEN_STORAGE_KEY);
    this.localstorage.removeItem(USERINFO_STORAGE_KEY);
    this.store.dispatch(saveIsAuthenticated({ payload: false }));
    this.store.dispatch(saveToken({ payload: '' }));
    this.store.dispatch(saveUserInfo({ payload: null }));
    return true;
  }

  getUserInfo(): Observable<IUserInfo> {
    return this.http.post<IUserInfo>('/api/auth/userinfo', {
      token: this.localstorage.getItem(TOKEN_STORAGE_KEY) || '',
    });
  }
}
