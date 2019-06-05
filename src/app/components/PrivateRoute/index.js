import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { navigate } from 'gatsby';
import { selectSession } from '../../selectors';
import ClientOAuth2 from 'client-oauth2';
import _has from 'lodash/has';
import Moment from 'moment';

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
                // Get the access token from the fragment identifier.
                // This will throw if there is no fragment identifier.
                // May be undefined.
                const ouraAuthResult = await ouraAuth.token.getToken(window.location.href);

                if (ouraAuthResult.accessToken === undefined) {
                    throw new Error('Invalid access token');
                }

                setAccessToken(ouraAuthResult.accessToken);

                window.location.hash = '';

                // Store the access token in localStorage.
                // TODO: Associate access token with current user.
                window.localStorage.setItem(
                    'ouraLeaderboardOAuth2Result',
                    JSON.stringify({
                        accessToken: ouraAuthResult.accessToken,
                        expires: ouraAuthResult.expires.getTime()
                    })
                );
            } catch (e) {
                // Check localStorage for access token.
                const oAuth2Result = JSON.parse(
                    window.localStorage.getItem('ouraLeaderboardOAuth2Result')
                );

                // Is there an unexpired token?
                if (
                    _has(oAuth2Result, 'expires') &&
                    Moment().isBefore(Moment(oAuth2Result.expires).subtract(1, 'days'))
                ) {
                    setAccessToken(oAuth2Result.accessToken);
                    return;
                }

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
