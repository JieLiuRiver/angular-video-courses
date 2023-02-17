import { TestBed } from '@angular/core/testing';
import { CourseService } from './courses.service';
import { HttpClientModule } from '@angular/common/http';

describe('CourseService', () => {
  let service: CourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseService],
      imports: [HttpClientModule]
    });
    service = TestBed.inject(CourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
