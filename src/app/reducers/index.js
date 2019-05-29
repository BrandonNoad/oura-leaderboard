import { combineReducers } from 'redux';

import session from './session';
import isLoading from './is-loading';
import errorMessage from './error-message';

export default combineReducers({
    session,
    isLoading,
    errorMessage
});
