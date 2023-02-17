import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesEnterComponent } from './courses-enter.component';

describe('CoursesEnterComponent', () => {
  let component: CoursesEnterComponent;
  let fixture: ComponentFixture<CoursesEnterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesEnterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesEnterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
