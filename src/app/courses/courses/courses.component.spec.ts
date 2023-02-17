import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CourseService } from '../courses.service';
import { CourseItem } from '../course-item-model'
import MockCourses from '../mock-courses.json'

import { CoursesComponent } from './courses.component';
import { CourseItemComponent } from '../course-item/course-item.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OrderByPipe } from '../../pipes/order-by.pipe';
import { DurationPipe } from '../../pipes/duration.pipe';
import { DatePipe } from '@angular/common';
import { ConfirmationDialogService } from '../../confirmation-dialog/confirmation-dialog.service';

describe('CoursesComponent', () => {
  let COURSES: any[]
  let component: CoursesComponent;
  let courseServiceSpy: jasmine.SpyObj<CourseService>
  let confirmationDialogServiceSpy: jasmine.SpyObj<ConfirmationDialogService>
  let fixture: ComponentFixture<CoursesComponent>;


  beforeEach(async () => {
    COURSES = MockCourses;
    courseServiceSpy = jasmine.createSpyObj<CourseService>(['getCourses', 'removeCouse']);
    confirmationDialogServiceSpy = jasmine.createSpyObj<ConfirmationDialogService>(['confirm']);

    await TestBed.configureTestingModule({
      declarations: [
        CoursesComponent,
        CourseItemComponent,
        OrderByPipe,
        DurationPipe
      ],
      imports: [DatePipe],
      providers: [
        {
          provide: CourseService,
          useValue: courseServiceSpy
        },
        {
          provide: ConfirmationDialogService,
          useValue: confirmationDialogServiceSpy
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('shoule have courses from the service', () => {
  //   courseServiceSpy.getCourses.and.returnValue(Promise.resolve(COURSES))
  //   fixture.detectChanges()

  //   expect(component.courses.length).toBe(MockCourses.length);
  // })


  describe('Delete', () => {
    beforeEach(() => {
      component.courses = COURSES
    })

    // it('should delete the selected course from the courses', async () => {
    //   const deleteId = COURSES[0].id
    //   courseServiceSpy.removeCouse.and.callFake((id) => {
    //     courseServiceSpy.courses = COURSES.filter((course) => course.id !== id)
    //     return Promise.resolve(true)
    //   })
    //   courseServiceSpy.getCourses.and.returnValue(Promise.resolve(courseServiceSpy.courses))
    //   confirmationDialogServiceSpy.confirm.and.returnValue(Promise.resolve(true))
    //   const bool = await component.doDeleteCourseTask(deleteId + "")

    //   const deleteItem = courseServiceSpy.courses.find(o => o.id === deleteId)

    //   expect(bool).toBe(true)
    //   expect(deleteItem).toBe(undefined)
    // })

    it('should call doDeleteCourseTask method when CourseItem component button is clicked', () => {
      spyOn(component, 'doDeleteCourseTask')
      courseServiceSpy.getCourses.and.returnValue(Promise.resolve(COURSES))
      fixture.detectChanges();

      const coursesDEs = fixture.debugElement.queryAll(
        By.directive(CourseItemComponent)
      )
      for (let i = 0; i < coursesDEs.length; i++) {
        coursesDEs[i]
          .query(By.css('.delete-button'))
          .triggerEventHandler('click', { preventDefault: () => {} });
        expect(component.doDeleteCourseTask).toHaveBeenCalledWith(COURSES[i].id)
      }
    })

    it('should call the doDeleteCourseTask method when the onDelete event is emitted in CourseItem Component', () => {
      spyOn(component, 'doDeleteCourseTask')
      courseServiceSpy.getCourses.and.returnValue(Promise.resolve(COURSES))
      fixture.detectChanges();

      const coursesDEs = fixture.debugElement.queryAll(
        By.directive(CourseItemComponent)
      )

      for (let i = 0; i < coursesDEs.length; i++) {
        (coursesDEs[i].componentInstance as CourseItemComponent).onDelete.emit(COURSES[i].id)
        expect(component.doDeleteCourseTask).toHaveBeenCalledWith(COURSES[i].id)
      }
    });

  })

  describe('Edit', () => {
    beforeEach(() => {
      component.courses = COURSES
    })

    // it('should call doEditCourseTask method when CourseItem component button is clicked', () => {
    //   spyOn(component, 'doEditCourseTask')
    //   courseServiceSpy.getCourses.and.returnValue(COURSES)
    //   fixture.detectChanges();

    //   const coursesDEs = fixture.debugElement.queryAll(
    //     By.directive(CourseItemComponent)
    //   )
    //   for (let i = 0; i < coursesDEs.length; i++) {
    //     coursesDEs[i]
    //       .query(By.css('.edit-button'))
    //       .triggerEventHandler('click', { preventDefault: () => {} });
    //     expect(component.doEditCourseTask).toHaveBeenCalledWith(COURSES[i].id)
    //   }
    // })

    it('should call the doEditCourseTask method when the onEdit event is emitted in CourseItem Component', () => {
      spyOn(component, 'doEditCourseTask')
      courseServiceSpy.getCourses.and.returnValue(Promise.resolve(COURSES))
      fixture.detectChanges();

      const coursesDEs = fixture.debugElement.queryAll(
        By.directive(CourseItemComponent)
      )

      for (let i = 0; i < coursesDEs.length; i++) {
        (coursesDEs[i].componentInstance as CourseItemComponent).onEdit.emit(COURSES[i].id)
        expect(component.doEditCourseTask).toHaveBeenCalledWith(COURSES[i].id + '')
      }
    });
  })

});
