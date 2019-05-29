import * as actionTypes from '../../constants/action-types';

const session = (state = null, action) => {
    switch (action.type) {
        case actionTypes.LOG_IN:
            return action.session;

        case actionTypes.LOG_OUT:
            return null;

        default:
            return state;
    }
};

export default session;
