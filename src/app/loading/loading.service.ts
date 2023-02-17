import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoading = new Subject<boolean>();

  get isLoading$(): Observable<boolean> {
    return this.isLoading.asObservable();
  }

  constructor() {}

  toggleLoading(val: boolean) {
    this.isLoading.next(val);
  }
}
