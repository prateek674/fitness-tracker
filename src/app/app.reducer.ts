import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';

export interface State {
    ui: fromUI.State,
    auth: fromAuth.State
};

// grouping all the reducers
export const reducers: ActionReducerMap<State> = {
    ui: fromUI.uiReducer,
    auth: fromAuth.authReducer
};

// makes it easier to pull information from our state - DO NOT UNDERSTAND!
export const getUIState = createFeatureSelector<fromUI.State>('ui');
// passes pointed to getUIState and doesn't execute the func here
// passes the object of interface State (1st arg) into a function (2md arg)
export const getIsLoading = createSelector(getUIState, fromUI.getIsLoading);

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuthenticated = createSelector(getAuthState, fromAuth.getIsAuthenticated);