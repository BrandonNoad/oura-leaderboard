import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Box, Heading } from '@rebass/emotion';
import { connect } from 'react-redux';
import Moment from 'moment';

import DayHeading from '../DayHeading';
import GotoBox from '../GotoBox';

import { fetchSleepForDay } from '../../actions';

const App = ({ moment, accessToken, fetchSleepForDay }) => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        (async function() {
            setResults([]);

            const results = await fetchSleepForDay(Moment(moment).subtract(1, 'days'), accessToken);

            setResults(results.sort((a, b) => b.data.score - a.data.score));
        })();
    }, [moment, accessToken]);

    const formatRank = (rank) => {
        switch (rank) {
            case 1:
                return '1st';

            case 2:
                return '2nd';

            case 3:
                return '3rd';

            default:
                return `${rank}th`;
        }
    };

    const items = [
        <div className="item" key={0}>
            RANK
        </div>,
        <div className="item" key={1}>
            SCORE
        </div>,
        <div className="item" key={2}>
            NAME
        </div>
    ].concat(
        results.flatMap((result, idx) => [
            <div className={`item item${idx % 7}`} key={3 * idx + 3}>
                {formatRank(idx + 1)}
            </div>,
            <div className={`item item${idx % 7}`} key={3 * idx + 4}>
                {result.data.score}
            </div>,
            <div className={`item item${idx % 7}`} key={3 * idx + 5}>
                {result.email.slice(0, result.email.indexOf('@'))}
            </div>
        ])
    );

    return (
        <>
            <GotoBox />
            <DayHeading />
            <div
                className="container"
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 2fr',
                    gridGap: '10px'
                }}
            >
                {items}
            </div>
        </>
    );
};

App.propTypes = {
    moment: PropTypes.object,
    accessToken: PropTypes.string,
    fetchSleepForDay: PropTypes.func
};

const mapStateToProps = (state) => ({ moment: state.moment });

export default connect(
    mapStateToProps,
    { fetchSleepForDay }
)(App);
