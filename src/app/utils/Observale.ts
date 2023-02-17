import { Observable, Subscription } from 'rxjs';

export const getValue = <T>(obj: Observable<T>): {
  value: T
  subscription: Subscription
} => {
  let value: T;
  let subscription: Subscription
  subscription = obj.subscribe(v => value = v);
  return {
    value: value!,
    subscription
  }
}
