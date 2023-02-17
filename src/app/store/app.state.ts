import { CourseState } from './course/course.state';
import { courseReducer } from './course/course.reducer';
import { AuthState } from './auth/auth.state';
import { authReducer } from './auth/auth.reducer';


export interface AppState {
  course: CourseState
  auth: AuthState
}

export const appReducer = {
  course: courseReducer,
  auth: authReducer
}
