import { CourseNameFilterPipe } from './course-name-filter.pipe';
import { TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms';
import MockData from '../courses/mock-courses.json'

describe('CourseNameFilterPipe', () => {
  let pipe: CourseNameFilterPipe

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [CourseNameFilterPipe],
      imports: [FormsModule]
    })
    .compileComponents();

    pipe = new CourseNameFilterPipe();
  })

  it('create an instance', () => {
    expect(pipe).toBeTruthy()
  })


});
