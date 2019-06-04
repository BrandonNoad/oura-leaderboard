import Moment from 'moment';
import * as actionTypes from '../../constants/action-types';

export const updateMomentFactory = (getTodayMoment) => (state, goto) => {
    switch (goto) {
        case 'today':
            return getTodayMoment();

        case 'next-day':
            return Moment(state).add(1, 'days');

        case 'prev-day':
            return Moment(state).subtract(1, 'days');

        default:
            return state;
    }
};

export const momentFactory = (getTodayMoment) => (state = getTodayMoment(), action) => {
    const updateMoment = updateMomentFactory(getTodayMoment);

    switch (action.type) {
        case actionTypes.UPDATE_MOMENT:
            return updateMoment(state, action.goto);

        default:
            return state;
    }
};

export default momentFactory(Moment);
