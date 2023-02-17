import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE } from '@ng-web-apis/common';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(@Inject(LOCAL_STORAGE) private localStorage: Storage) { }

  public setItem(key: string, value: string): void {
    this.localStorage?.setItem(key, value);
  }

  public getItem(key: string): string | null {
    return this.localStorage?.getItem(key);
  }

  public removeItem(key: string): void {
    this.localStorage?.removeItem(key);
  }
}
