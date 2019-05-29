import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { navigate } from 'gatsby';
import netlifyIdentity from 'netlify-identity-widget';
import { Flex } from '@rebass/emotion';

import { selectSession } from '../app/selectors';

import Layout from '../components/Layout';

import { css } from '@emotion/core';

const container = css`
    height: calc(100vh - 50px);
`;

// TODO: this isn't refreshing when we log in/log out. Probably something to do with it being a static page.
const IndexPage = ({ session }) => {
    const isLoggedIn = session !== null;

    useEffect(() => {
        // If the user is already logged in, then redirect to the app page.
        if (isLoggedIn) {
            navigate('/app');
            return;
        }

        netlifyIdentity.open();
    }, [isLoggedIn]);

    if (isLoggedIn) {
        // TODO: Use loading component.
        return <p>Loading...</p>;
    }

    return (
        <Layout>
            <Flex justifyContent="center" alignItems="center" css={container} />
        </Layout>
    );
};

IndexPage.propTypes = {
    // TODO: enforce null or string
    session: PropTypes.any
};

export default connect((state) => ({
    session: selectSession(state)
}))(IndexPage);
