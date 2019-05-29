'use strict';

module.exports = {
    // We are not able to minimize since the evernote module needs to search for the
    // 'authenticationToken' param.
    // TODO: Switch to netlify dev when it is more mature.
    optimization: { minimize: false }
};
