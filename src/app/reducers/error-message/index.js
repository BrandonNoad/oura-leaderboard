import * as actionTypes from '../../constants/action-types';

const errorMessage = (state = null, action) => {
    switch (action.type) {
        // case actionTypes.CREATE_PROJECT_PLAN_FAILURE:
        //     return action.message;

        // case actionTypes.CREATE_PROJECT_PLAN_REQUEST:
        // case actionTypes.CREATE_PROJECT_PLAN_SUCCESS:
        //     return null;

        default:
            return state;
    }
};

export default errorMessage;
