import { createAction, props } from '@ngrx/store';
import { CourseItem, IAuthor } from 'src/app/courses/course-item-model';

export enum ESaveType {
  Replace = 'replace',
  Push = 'push',
}

export const saveCourse = createAction(
  'save-courses',
  props<{
    saveType: ESaveType;
    payload: CourseItem[];
  }>()
);

export const saveEditCourseInfo = createAction(
  'save-edit-course-info',
  props<{
    payload: CourseItem;
  }>()
);

export const removeCourse = createAction(
  'remove-course',
  props<{ payload: string | number }>()
);

export const removeCourseResult = createAction(
  'remove-course-result',
  props<{ payload: boolean }>()
);

export const addCourse = createAction(
  'add-course',
  props<{ payload: CourseItem }>()
);

export const addCourseResult = createAction(
  'add-course-result',
  props<{ payload: boolean }>()
);

export const updateCourse = createAction(
  'update-course',
  props<{
    payload: {
      id: string;
      course: Omit<CourseItem, 'id'>;
    };
  }>()
);

export const updateCourseResult = createAction(
  'update-course-result',
  props<{ payload: boolean }>()
);

export const saveAuthors = createAction(
  'save-authors',
  props<{
    payload: IAuthor[];
  }>()
);
