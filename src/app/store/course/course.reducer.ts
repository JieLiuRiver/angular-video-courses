import { createReducer, on, Action } from '@ngrx/store';
import { initialState, CourseState } from './course.state';
import { updateCourseResult } from './course.actions';
import {
  saveCourse,
  saveEditCourseInfo,
  removeCourseResult,
  addCourseResult,
  saveAuthors,
} from './course.actions';

const _courseReducer = createReducer(
  initialState,
  on(saveCourse, (state, action) => ({
    ...state,
    courses:
      action.saveType === 'push'
        ? [...state.courses, ...action.payload]
        : [...action.payload],
  })),
  on(saveEditCourseInfo, (state, action) => ({
    ...state,
    editCourseInfo: action.payload,
  })),
  on(removeCourseResult, (state, action) => ({
    ...state,
    removeCourseResult: action.payload,
  })),
  on(addCourseResult, (state, action) => ({
    ...state,
    addCourseResult: action.payload,
  })),
  on(updateCourseResult, (state, action) => ({
    ...state,
    updateCourseResult: action.payload,
  })),
  on(saveAuthors, (state, action) => ({
    ...state,
    authors: action.payload,
  }))
);

export function courseReducer(state: CourseState | undefined, action: Action) {
  return _courseReducer(state, action);
}
