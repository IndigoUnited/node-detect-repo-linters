'use strict';

const path = require('path');
const tryFiles = require('./util/tryFiles');
const tryPackageJson = require('./util/tryPackageJson');

function detectCssLint(dir, loadPackageJson) {
    const paths = ['.csslintrc']
    .map((entry) => path.join(dir, entry));

    return Promise.all([
        tryFiles(paths),
        tryPackageJson(loadPackageJson, ['devDependencies.csslint']),
    ])
    .then((booleans) => booleans.some((bool) => bool));
}

module.exports = detectCssLint;
