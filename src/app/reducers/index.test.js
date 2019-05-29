import rootReducer from './index';

describe('root reducer', () => {
    it('should load without crashing', () => {
        rootReducer(undefined, {});
    });
});
