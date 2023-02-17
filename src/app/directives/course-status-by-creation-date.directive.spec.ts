import { Component } from '@angular/core';
import * as dayjs from 'dayjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CourseStatusByCreationDateDirective } from './course-status-by-creation-date.directive';
import { By } from '@angular/platform-browser';


@Component({
  template: `
    <div style="border: 2px solid #000" [appCourseStatusByCreationDate]="date"></div>
  `
})
class TestComponent {
  date = dayjs().subtract(3)
}

describe('Directive: couser-status-by-createion-date', () => {
  let component: TestComponent
  let fixture: ComponentFixture<TestComponent>
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, CourseStatusByCreationDateDirective],
      schemas: [NO_ERRORS_SCHEMA]
    })
    fixture = TestBed.createComponent(TestComponent)
    component = fixture.componentInstance
  })

  it('should be created', () => {
    expect(component).toBeTruthy()
  })

  it('should return green color for the element', () => {
    fixture.detectChanges();
    const ele = fixture.debugElement.query(By.css('div'))
    expect(ele.nativeElement.style.borderColor).toBe('green')
  })
})
