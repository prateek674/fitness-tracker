import { Action } from "@ngrx/store";

export const SET_AUTHENTICATED = '[AUTH] SET AUTHENTICATED';
export const SET_UNAUTHENTICATED = '[AUTH] SET UNAUTHENTICATED';

export class SetAuthenticated implements Action {
    readonly type = SET_AUTHENTICATED;
}

export class SetUnAuthenticated implements Action {
    readonly type = SET_UNAUTHENTICATED;
}

// custom type for 'type'. Allowed in TS
export type AuthActions =  SetAuthenticated | SetUnAuthenticated;