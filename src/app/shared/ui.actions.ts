import { Action } from "@ngrx/store";

export const START_LOADING = '[UI] START LOADING';
export const STOP_LOADING = '[UI] STOP LOADING';

export class StartLoading implements Action {
    readonly type = START_LOADING;
}

export class StopLoading implements Action {
    readonly type = STOP_LOADING;
}

// custom type for 'type'. Allowed in TS
export type UIActions = StartLoading | StopLoading;