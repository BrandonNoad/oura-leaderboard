import React from 'react';
import PropTypes from 'prop-types';

import { Box } from '@rebass/emotion';

import Header from '../Header';

// TODO: use hook
// import { StaticQuery, graphql } from 'gatsby';

import 'normalize.css';
import './index.css';

import { css } from '@emotion/core';

const container = css`
    height: calc(100vh - 50px);
`;

const Layout = ({ children }) => (
    <>
        <Header />
        <main>
            <Box bg="black" p={5} css={container}>
                {children}
            </Box>
        </main>
    </>
);

Layout.propTypes = {
    children: PropTypes.node.isRequired
};

export default Layout;
