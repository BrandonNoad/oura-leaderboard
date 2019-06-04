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

export const updateMoment = (goto) => ({
    type: actionTypes.UPDATE_MOMENT,
    goto
});

export const fetchSleepForDayFactory = ({ fetchSleepForDay }) => (moment, accessToken) => async (
    dispatch
) => {
    const date = moment.format('YYYY-MM-DD');

    dispatch({ type: actionTypes.FETCH_SLEEP_FOR_DAY_REQUEST, date });

    try {
        const { data } = await fetchSleepForDay(date, accessToken);

        dispatch({ type: actionTypes.FETCH_SLEEP_FOR_DAY_SUCCESS, data });

        return data;
    } catch (err) {
        dispatch({
            type: actionTypes.FETCH_SLEEP_FOR_DAY_FAILURE,
            message: err.message || 'Error fetching sleep!'
        });
    }
};

export const fetchSleepForDay = fetchSleepForDayFactory(api);
