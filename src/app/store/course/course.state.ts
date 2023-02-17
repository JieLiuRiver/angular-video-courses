import { CourseItem } from 'src/app/courses/course-item-model';
import { IAuthor } from '../../courses/course-item-model';

export interface CourseState {
  courses: CourseItem[];
  editCourseInfo?: CourseItem;
  addCourseInfo?: CourseItem;
  addCourseResult: boolean;
  removeCourseResult: boolean;
  updateCourseResult: boolean;
  authors?: IAuthor[];
}

export const initialState: CourseState = {
  courses: [],
  removeCourseResult: false,
  addCourseResult: false,
  updateCourseResult: false,
};
