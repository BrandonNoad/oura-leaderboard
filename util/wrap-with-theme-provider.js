import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'emotion-theming';

const theme = {};

const wrapWithThemeProvider = ({ element }) => (
    <ThemeProvider theme={theme}>{element}</ThemeProvider>
);

wrapWithThemeProvider.propTypes = {
    element: PropTypes.node
};

export default wrapWithThemeProvider;
