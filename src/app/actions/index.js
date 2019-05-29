import * as api from '../api';
import * as actionTypes from '../constants/action-types';

export const logIn = (session) => (dispatch) => {
    // Initialize the api service.
    api.init(session.token.access_token);

    return dispatch({
        type: actionTypes.LOG_IN,
        session
    });
};

export const logOut = () => ({
    type: actionTypes.LOG_OUT
});

// export const createProjectPlanFactory = ({ createProjectPlan }) => (payload) => async (
//     dispatch
// ) => {
//     dispatch({ type: actionTypes.CREATE_PROJECT_PLAN_REQUEST });

//     try {
//         await createProjectPlan(payload);

//         dispatch({ type: actionTypes.CREATE_PROJECT_PLAN_SUCCESS });
//     } catch (err) {
//         dispatch({
//             type: actionTypes.CREATE_PROJECT_PLAN_FAILURE,
//             message: err.message || 'Error creating project plan!'
//         });
//     }
// };

// export const createProjectPlan = createProjectPlanFactory(api);
