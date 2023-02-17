import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthorsService } from './services/authors.service';
import { LocalStorageService } from './services/local-storage.service';
import { AppState } from './store/app.state';
import { saveAuthors } from './store/course/course.actions';
import {
  saveIsAuthenticated,
  saveToken,
  saveUserInfo,
} from './store/auth/auth.actions';
import {
  TOKEN_STORAGE_KEY,
  USERINFO_STORAGE_KEY,
} from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Task_13_SSR';

  constructor(
    private authorsService: AuthorsService,
    private store: Store<AppState>,
    private localStorage: LocalStorageService
  ) {
    if (this.localStorage) {
      const token = this.localStorage.getItem(TOKEN_STORAGE_KEY) || '';
      this.store.dispatch(saveToken({ payload: token }));
      this.store.dispatch(saveIsAuthenticated({ payload: !!token }));
      this.store.dispatch(
        saveUserInfo({
          payload: JSON.parse(
            this.localStorage.getItem(USERINFO_STORAGE_KEY) || '{}'
          ),
        })
      );
    }
  }

  ngOnInit() {
    this.authorsService.getAuthors().subscribe((authors) => {
      this.store.dispatch(saveAuthors({ payload: authors }));
    });
  }
}
