import wrapWithReduxProvider from './wrap-with-redux-provider';
import wrapWithThemeProvider from './wrap-with-theme-provider';

const wrapRootElement = (params) =>
    wrapWithReduxProvider({ element: wrapWithThemeProvider(params) });

export default wrapRootElement;
