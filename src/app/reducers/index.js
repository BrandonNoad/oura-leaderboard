import { combineReducers } from 'redux';

import session from './session';
import isLoading from './is-loading';
import errorMessage from './error-message';
import moment from './moment';

export default combineReducers({
    session,
    isLoading,
    errorMessage,
    moment
});
