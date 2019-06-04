import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { navigate } from 'gatsby';
import netlifyIdentity from 'netlify-identity-widget';
import { Flex, Box } from '@rebass/emotion';

import { selectSession } from '../app/selectors';

import Layout from '../components/Layout';
import Image from '../components/image';

const IndexPage = ({ session }) => {
    const isLoggedIn = session !== null;

    useEffect(() => {
        // If the user is already logged in, then redirect to the app page.
        if (isLoggedIn) {
            navigate('/app');
            return;
        }

        if (window.location.hash === '') {
            netlifyIdentity.open();
        }
    }, [isLoggedIn]);

    if (isLoggedIn) {
        // TODO: Use loading component.
        return null;
    }

    return (
        <Layout>
            <Flex justifyContent="center" alignItems="center" style={{ height: '100%' }}>
                <Box width={[1 / 2, 1 / 3, 1 / 4]}>
                    <Image />
                </Box>
            </Flex>
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
