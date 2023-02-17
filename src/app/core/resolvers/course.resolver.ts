import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { CourseService } from 'src/app/courses/courses.service';

@Injectable({
  providedIn: 'root'
})
export class CourseResolver implements Resolve<any> {
  constructor(private courseService: CourseService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.courseService.getCourse(route.params['id']);
  }
}
