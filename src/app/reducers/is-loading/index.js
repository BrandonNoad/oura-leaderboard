import * as actionTypes from '../../constants/action-types';

const isLoading = (state = false, action) => {
    switch (action.type) {
        // case actionTypes.CREATE_PROJECT_PLAN_REQUEST:
        //     return true;

        // case actionTypes.CREATE_PROJECT_PLAN_SUCCESS:
        // case actionTypes.CREATE_PROJECT_PLAN_FAILURE:
        //     return false;

        default:
            return state;
    }
};

export default isLoading;
