import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { navigate } from 'gatsby';
import { selectSession } from '../../selectors';

const PrivateRoute = ({ session, component: Component, ...rest }) => {
    const isLoggedIn = session !== null;

    useEffect(() => {
        // If the user is NOT logged in, then redirect to the index page.
        if (!isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn]);

    if (!isLoggedIn) {
        // TODO: Use loading component.
        return <p>Loading...</p>;
    }

    return <Component session={session} {...rest} />;
};

PrivateRoute.propTypes = {
    // TODO: better type for this?
    component: PropTypes.any.isRequired,
    // TODO: enforce null or string
    session: PropTypes.any
};

export default connect((state) => ({
    session: selectSession(state)
}))(PrivateRoute);
