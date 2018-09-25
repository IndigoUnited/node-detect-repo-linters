'use strict';

const path = require('path');
const tryFiles = require('./util/tryFiles');
const tryPackageJson = require('./util/tryPackageJson');

function detectJsHint(dir, loadPackageJson) {
    const paths = ['.jshintrc']
    .map((entry) => path.join(dir, entry));

    return Promise.all([
        tryFiles(paths),
        tryPackageJson(loadPackageJson, ['devDependencies.jshint', 'jshintConfig']),
    ])
    .then((booleans) => booleans.some((bool) => bool));
}

module.exports = detectJsHint;
