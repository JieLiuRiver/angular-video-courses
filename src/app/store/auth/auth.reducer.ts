import { createReducer, on, Action } from '@ngrx/store';
import { initialState, AuthState } from './auth.state';
import { saveToken, saveIsAuthenticated, saveUserInfo } from './auth.actions';

const _authReducer = createReducer(
  initialState,
  on(saveIsAuthenticated, (state, action) => ({
      ...state,
      isAuthenticated: action.payload
  })),
  on(saveToken, (state, action) => ({
      ...state,
      token: action.payload
  })),
  on(saveUserInfo, (state, action) => ({
      ...state,
      userInfo: action.payload
  }))
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}
