import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface UserState {
    maskUserName: boolean;
}

const initalState: UserState = {
    maskUserName: false,
};

const getUserFeatureState =
  createFeatureSelector<UserState>('users');

export const getMaskUserName = createSelector(
    getUserFeatureState,
    state => state.maskUserName
);

export function reducer(state = initalState, action): UserState {

    switch (action.type) {

        case 'TOGGLE_USER_NAME' :
               return {
                ...state,
                maskUserName: action.payload
            };

        default:
            return state;
    }
}