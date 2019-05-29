import React from 'react';
import PropTypes from 'prop-types';

import { Box } from '@rebass/emotion';

import Header from '../Header';

// TODO: use hook
// import { StaticQuery, graphql } from 'gatsby';

import 'normalize.css';
import './index.css';

const Layout = ({ children }) => (
    <>
        <Header />
        <main>
            <Box>{children}</Box>
        </main>
    </>
);

Layout.propTypes = {
    children: PropTypes.node.isRequired
};

export default Layout;
