import { createAction, props } from '@ngrx/store';
import { IUserInfo } from 'src/app/services/authentication.service';

export const saveIsAuthenticated = createAction('save-is-authenticated', props<{
  payload: boolean
}>());

export const saveToken = createAction('save-token', props<{
  payload: string
}>());

export const saveUserInfo = createAction('save-userinfo', props<{
  payload: IUserInfo | null
}>());
