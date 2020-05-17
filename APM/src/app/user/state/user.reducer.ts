import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserActionTypes } from 'src/app/state/user.actions';

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

        case UserActionTypes.MaskUserName :
               return {
                ...state,
                maskUserName: action.payload
            };

        default:
            return state;
    }
}