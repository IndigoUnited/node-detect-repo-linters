'use strict';

const path = require('path');
const loadJsonFile = require('load-json-file');
const get = require('lodash.get');

function tryPackageJson(dir, props) {
    return loadJsonFile(path.join(dir, 'package.json'))
    .then((json) => {
        return props.some((prop) => get(json, prop));
    }, (err) => {
        if (err.code === 'ENOENT') {
            return false;
        }

        throw err;
    });
}

module.exports = tryPackageJson;
