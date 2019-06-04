import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { navigate } from 'gatsby';
import { selectSession } from '../../selectors';
import ClientOAuth2 from 'client-oauth2';

const PrivateRoute = ({ session, component: Component, ...rest }) => {
    const isLoggedIn = session !== null;

    const [accessToken, setAccessToken] = useState();

    useEffect(() => {
        // If the user is NOT logged in, then redirect to the index page.
        if (!isLoggedIn) {
            navigate('/');
            return;
        }

        const ouraAuth = new ClientOAuth2({
            clientId: process.env.GATSBY_OURA_APP_CLIENT_ID,
            authorizationUri: process.env.GATSBY_OURA_OAUTH2_AUTHORIZE_URL,
            redirectUri: `${process.env.GATSBY_BASE_URL}/app/`,
            scopes: ['email', 'personal', 'daily']
            // TODO: add state
        });

        (async function() {
            try {
                // This will throw if there is no fragment identifier.
                // May be undefined.
                const { accessToken } = await ouraAuth.token.getToken(window.location.href);

                if (accessToken === undefined) {
                    throw new Error('Invalid access token');
                }

                setAccessToken(accessToken);

                window.location.hash = '';
            } catch (e) {
                // Redirect users to log in to Oura and authorize this app.
                window.location.href = ouraAuth.token.getUri();
            }
        })();
    }, [isLoggedIn]);

    if (!isLoggedIn || accessToken === undefined) {
        // TODO: Use loading component.
        return null;
    }

    return <Component session={session} accessToken={accessToken} {...rest} />;
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
