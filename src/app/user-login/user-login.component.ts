import { Component, OnInit, OnDestroy } from '@angular/core';
// import { of, Observable } from 'rxjs';
import { Router, Event, NavigationStart } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { saveUserInfo } from '../store/auth/auth.actions';
import {
  AuthenticationService,
  USERINFO_STORAGE_KEY,
  IUserInfo,
} from '../services/authentication.service';
import { AppState } from '../store/app.state';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  userName?: String;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private store: Store<AppState>,
    private localStorage: LocalStorageService
  ) {
    this.subscription.add(
      this.router.events.subscribe(async (event: Event) => {
        if (event instanceof NavigationStart) {
          this.handleInfo();
        }
      })
    );
  }

  handleInfo() {
    this.subscription.add(
      this.authenticationService.getUserInfo().subscribe((data: IUserInfo) => {
        this.localStorage.setItem(USERINFO_STORAGE_KEY, JSON.stringify(data));
        this.store.dispatch(saveUserInfo({ payload: data }));
        this.userName = `${data.name?.last} ${data.name?.first}`;
      })
    );
  }

  async ngOnInit() {
    this.handleInfo();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
