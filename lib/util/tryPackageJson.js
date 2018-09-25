'use strict';

const get = require('lodash.get');

function tryPackageJson(loadPackageJson, props) {
    return loadPackageJson()
    .then((packageJson) => {
        if (!packageJson) {
            return false;
        }

        return props.some((prop) => get(packageJson, prop));
    });
}

module.exports = tryPackageJson;
