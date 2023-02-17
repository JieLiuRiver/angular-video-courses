import { CourseState } from './course.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const getCourseState = createFeatureSelector<CourseState>('course');

export const getCourses = createSelector(
  getCourseState,
  (state) => state.courses
);
export const getEditCoursesInfo = createSelector(
  getCourseState,
  (state) => state.editCourseInfo
);
export const getAddCoursesInfo = createSelector(
  getCourseState,
  (state) => state.addCourseInfo
);

export const selectRemoveCourseResult = createSelector(
  getCourseState,
  (state) => state.removeCourseResult
);

export const selectAddCourseResult = createSelector(
  getCourseState,
  (state) => state.addCourseResult
);
export const selectUpdateCourseResult = createSelector(
  getCourseState,
  (state) => state.updateCourseResult
);
export const getAuthors = createSelector(
  getCourseState,
  (state) => state.authors
);
