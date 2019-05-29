import React from 'react';
import { Router } from '@reach/router';

import Layout from '../components/Layout';
import PrivateRoute from '../app/components/PrivateRoute';
import App from '../app/components/App';

const AppPage = () => (
    <Layout>
        <Router>
            <PrivateRoute path="/app" component={App} default />
        </Router>
    </Layout>
);

export default AppPage;
