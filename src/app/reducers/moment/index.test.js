import Moment from 'moment';
import { momentFactory, updateMomentFactory } from './moment';
import { updateMoment } from '../actions';
import * as actionTypes from '../actions/actionTypes';

const todayMoment = Moment();

const getTodayMoment = () => todayMoment;

describe('moment reducer', () => {
    const moment = momentFactory(getTodayMoment);

    describe('when the state arg is undefined', () => {
        it('should return the initial state', () => {
            const newState = moment(undefined, {});

            expect(newState).toEqual(todayMoment);
        });
    });

    it('should handle UPDATE_MOMENT', () => {
        let previousState = todayMoment;

        let newState = moment(previousState, updateMoment('next-week'));

        expect(newState).toEqual(Moment(previousState).add(7, 'days'));

        previousState = newState;

        newState = moment(previousState, updateMoment('today'));

        expect(newState).toEqual(todayMoment);

        previousState = newState;

        newState = moment(previousState, updateMoment('prev-week'));

        expect(newState).toEqual(Moment(previousState).subtract(7, 'days'));

        previousState = newState;

        newState = moment(previousState, updateMoment('prev-week'));

        expect(newState).toEqual(Moment(previousState).subtract(7, 'days'));

        previousState = newState;

        // should return previous state when action.goto is invalid
        newState = moment(previousState, { type: actionTypes.UPDATE_MOMENT, goto: 'invalid' });

        expect(newState).toEqual(previousState);
    });
});

describe('updateMoment', () => {
    const updateMoment = updateMomentFactory(getTodayMoment);

    describe("when goto is 'today'", () => {
        it('should return a moment representing today', () => {
            const result = updateMoment(Moment(), 'today');

            expect(result).toEqual(todayMoment);
        });
    });

    describe("when goto is 'next-week'", () => {
        it("should add 7 days to the previous state's moment", () => {
            const previousState = Moment();

            const result = updateMoment(previousState, 'next-week');

            expect(result).toEqual(previousState.add(7, 'days'));
        });
    });

    describe("when goto is 'prev-week'", () => {
        it("should subtract 7 days to the previous state's moment", () => {
            const previousState = Moment();

            const result = updateMoment(previousState, 'prev-week');

            expect(result).toEqual(previousState.subtract(7, 'days'));
        });
    });

    describe('when goto is not a valid value', () => {
        it('should return the previous state', () => {
            const previousState = Moment();

            const result = updateMoment(previousState, 'i-am-invalid');

            expect(result).toEqual(previousState);
        });
    });
});
