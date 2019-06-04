import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Heading } from '@rebass/emotion';

import Moment from 'moment';

const getDayHeading = (moment) => {
    if (moment.isSame(Moment(), 'day')) {
        return 'Today';
    }

    if (moment.isSame(Moment().subtract(1, 'days'), 'day')) {
        return 'Yesterday';
    }

    return moment.format('ddd, MMMM Do, YYYY');
};

const DayHeading = ({ moment }) => (
    <Heading color="#64e7ec" mb={2}>
        {getDayHeading(moment)}
    </Heading>
);

DayHeading.propTypes = {
    moment: PropTypes.any
};

const mapStateToProps = (state) => ({ moment: state.moment });

export default connect(mapStateToProps)(DayHeading);
