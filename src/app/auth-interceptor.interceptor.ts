import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TOKEN_STORAGE_KEY } from './services/authentication.service';
import { LocalStorageService } from './services/local-storage.service';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {
constructor(private localStorage: LocalStorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(
      request.clone({
        setHeaders: {
          token: this.localStorage.getItem(TOKEN_STORAGE_KEY) || ''
        },
      })
    );
  }
}
