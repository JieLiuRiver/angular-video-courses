import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Location, CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import {Routes} from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import { BreadcrumbMenusComponent } from './breadcrumb-menus.component'


class CoursesComponent {}

describe('BreadcrumbMenusComponent', () => {
  let location: Location;
  let router: Router;
  let component: BreadcrumbMenusComponent;
  let fixture: ComponentFixture<BreadcrumbMenusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreadcrumbMenusComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule.withRoutes(
          [
            {
              path: 'courses', component: CoursesComponent
            }
          ]
        )
      ]
    })

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(BreadcrumbMenusComponent);
    component = fixture.componentInstance;
    router.initialNavigation();
    fixture.detectChanges();
  });

  it('navigate to "courses/"', fakeAsync(() => {
    router.navigate(['/courses'])
    tick()
    expect(location.path()).toBe('/courses')
  }))

});
