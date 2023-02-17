import { AuthState } from './auth.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const getAuthState = createFeatureSelector<AuthState>('auth');

export const getIsAuthenticated = createSelector(getAuthState, (state) => state.isAuthenticated);
export const getToken = createSelector(getAuthState, (state) => state.token);
