import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, catchError, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { CourseService } from 'src/app/courses/courses.service';
import {
  addCourse,
  addCourseResult,
  removeCourse,
  removeCourseResult,
  updateCourse,
  updateCourseResult,
} from './course.actions';

@Injectable()
export class CourseEffects {
  @Effect()
  removeCourse$ = this.actions$.pipe(
    ofType(removeCourse),
    switchMap(
      (
        action: any // TODO: replace any
      ) =>
        this.coursesService.removeCourse(action.payload).pipe(
          map(() => removeCourseResult({ payload: true })),
          catchError(() => of(removeCourseResult({ payload: false })))
        )
    )
  );

  @Effect()
  addCourse$ = this.actions$.pipe(
    ofType(addCourse),
    switchMap((action: any) =>
      this.coursesService.createCourse(action.payload).pipe(
        map(() => addCourseResult({ payload: true })),
        catchError(() => of(addCourseResult({ payload: false })))
      )
    )
  );

  @Effect()
  updateCourse$ = this.actions$.pipe(
    ofType(updateCourse),
    switchMap((action: any) =>
      this.coursesService
        .updateCourse(action.payload.id, action.payload.course)
        .pipe(
          map(() => updateCourseResult({ payload: true })),
          catchError(() => of(updateCourseResult({ payload: false })))
        )
    )
  );

  constructor(
    private actions$: Actions,
    private coursesService: CourseService
  ) {}
}
