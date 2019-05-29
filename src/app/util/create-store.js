import { applyMiddleware, createStore as reduxCreateStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

const createStore = () => {
    const middleware = [thunk];

    if (process.env.NODE_ENV !== 'production') {
        middleware.push(logger);
    }

    return reduxCreateStore(rootReducer, {}, applyMiddleware(...middleware));
};

export default createStore;
