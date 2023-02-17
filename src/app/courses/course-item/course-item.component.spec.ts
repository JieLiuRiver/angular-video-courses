import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseItemComponent } from './course-item.component';
import { first } from 'rxjs';
import { CourseItem } from '../course-item-model';
import { DurationPipe } from '../../pipes/duration.pipe';

describe('CourseItemComponent', () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseItemComponent, DurationPipe ],
    });

    fixture = TestBed.createComponent(CourseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should raise an event when the delete button is clicked', () => {
    const courseInfo: CourseItem = {
      id: '1',
      title: 'Title 1',
      description: 'Description 1',
      creationDate: '2022-11-08',
      duration: 20,
      topRated: false
    }
    component.info = courseInfo

    component.onDelete.pipe(first()).subscribe((courseId) => {
      expect(courseId).toEqual(courseInfo.id);
    })
    component.doDelete(new MouseEvent('click'))
  })

  it('should raise an event when the edit button is clicked', () => {
    const courseInfo: CourseItem = {
      id: '2',
      title: 'Title 2',
      description: 'Description 2',
      creationDate: '2022-11-08',
      duration: 20,
      topRated: false
    }
    component.info = courseInfo

    component.onEdit.pipe(first()).subscribe((courseId) => {
      expect(courseId).toEqual(courseInfo.id);
    })
    component.doEdit(new MouseEvent('click'))
  })

});
