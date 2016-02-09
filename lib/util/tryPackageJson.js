'use strict';

const path = require('path');
const loadJsonFile = require('load-json-file');

function tryPackageJson(dir, prop) {
    return loadJsonFile(path.join(dir, 'package.json'))
    .then((json) => !!json[prop], (err) => {
        if (err.code === 'ENOENT') {
            return false;
        }

        throw err;
    });
}

module.exports = tryPackageJson;
