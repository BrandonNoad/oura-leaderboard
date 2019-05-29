// import { createSelector } from 'reselect';
import _get from 'lodash/get';

// May be null if the user is not logged in.
export const selectSession = (state) => _get(state, 'session', null);
