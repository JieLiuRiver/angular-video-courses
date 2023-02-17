import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  Router,
  Event,
  NavigationStart,
  ActivatedRoute,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { CourseService } from '../courses/courses.service';

interface IMenu {
  routerLink: string;
  text: string;
}

const COURSES_MENU: IMenu = {
  routerLink: 'courses',
  text: 'COURSE_MENU',
};
const ADD_MENU: IMenu = {
  routerLink: 'courses/new',
  text: 'NEW_COURSE_MENU',
};

@Component({
  selector: 'app-breadcrumb-menus',
  templateUrl: './breadcrumb-menus.component.html',
  styleUrls: ['./breadcrumb-menus.component.css'],
})
export class BreadcrumbMenusComponent implements OnInit, OnDestroy {
  private routerEventSubscribeHandle: Subscription = new Subscription();

  menus: IMenu[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) {
    this.initEvent();
  }

  ngOnInit(): void {}

  initEvent() {
    this.routerEventSubscribeHandle.add(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.refreshMenus(event);
        }
      })
    );
  }

  refreshMenus(event: any) {
    const menus: IMenu[] = [];
    if (event.url === '/courses') {
      menus.push(COURSES_MENU);
    } else if (event.url === '/courses/new') {
      menus.push(COURSES_MENU, ADD_MENU);
    } else if (/^\/courses\/(\d*)$/.test(event.url)) {
      this.courseService
        .getCourse(event.url.split('/courses/')[1])
        .subscribe((data) => {
          menus.push(COURSES_MENU, {
            routerLink: 'courses',
            text: data?.name || '',
          });
        });
    }
    this.menus = menus;
  }

  ngOnDestroy() {
    this.routerEventSubscribeHandle.unsubscribe();
  }
}
