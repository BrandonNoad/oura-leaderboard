import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import netlifyIdentity from 'netlify-identity-widget';

import createStore from '../src/app/util/create-store';

import { logIn, logOut } from '../src/app/actions';

const ReduxProviderPreloadedWithSession = ({ store, children }) => {
    const [isReady, setIsReady] = useState(false);

    const boundLogInFactory = (cb = () => {}) => (session) => {
        store.dispatch(logIn(session));
        cb();
    };

    const boundLogOut = () => store.dispatch(logOut());

    useEffect(() => {
        netlifyIdentity.init();

        // May be null.
        const netlifyIdentityResult = netlifyIdentity.currentUser();

        if (netlifyIdentityResult !== null) {
            // Is the token fresh?
            if (Date.now() < netlifyIdentityResult.token.expires_at) {
                boundLogInFactory()(netlifyIdentityResult);
            } else {
                netlifyIdentity.logout();
            }
        }

        netlifyIdentity.on('login', boundLogInFactory(netlifyIdentity.close));

        netlifyIdentity.on('logout', boundLogOut);

        setIsReady(true);
    }, [store]);

    if (!isReady) {
        // TODO: Use loading component.
        return <p>Loading...</p>;
    }

    return <Provider store={store}>{children}</Provider>;
};

ReduxProviderPreloadedWithSession.propTypes = {
    store: PropTypes.object,
    children: PropTypes.any
};

const wrapWithReduxProvider = ({ element }) => {
    // Creating store in `wrapRootElement` handler ensures:
    //  - there is fresh store for each SSR page
    //  - it will be called only once in browser, when React mounts
    const store = createStore();

    return (
        <ReduxProviderPreloadedWithSession store={store}>
            {element}
        </ReduxProviderPreloadedWithSession>
    );
};

wrapWithReduxProvider.propTypes = {
    element: PropTypes.any
};

export default wrapWithReduxProvider;
