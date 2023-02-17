import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router, Event, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-logoff',
  templateUrl: './user-logoff.component.html',
  styleUrls: ['./user-logoff.component.css'],
})
export class UserLogoffComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  show: boolean = true;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.subscription.add(
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationStart) {
          this.show = event.url !== '/login';
        }
      })
    );
  }

  ngOnInit(): void {}

  onPress() {
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
