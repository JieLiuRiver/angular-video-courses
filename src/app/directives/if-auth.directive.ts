import { Directive, OnInit, Input, ElementRef, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { Router, Event, NavigationStart } from '@angular/router';
import { getValue } from '../utils/Observale';
import { AppState } from '../store/app.state';
import { getIsAuthenticated } from '../store/auth/auth.selectors';

@Directive({
  selector: '[appIfAuth]'
})
export class IfAuthDirective  implements OnInit, OnDestroy {
  @Input('appIfAuth') public type?: string;

  isAuthenticated: boolean;
  subscription: Subscription = new Subscription()

  constructor(
    private authenticationService: AuthenticationService,
    private el: ElementRef,
    private router: Router,
    private store: Store<AppState>
  ) {

    this.isAuthenticated = getValue(this.store.select(getIsAuthenticated)).value

    this.subscription.add(this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.isAuthenticated = getValue(this.store.select(getIsAuthenticated)).value
        this.changeView(event.url)
      }
    }))
  }

  ngOnInit() {
    this.changeView()
  }

  changeView(url?: string) {
    const displayValue = (!this.isAuthenticated || url === '/login') ? 'none' : 'block'
    this.el.nativeElement.style.display = displayValue
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
