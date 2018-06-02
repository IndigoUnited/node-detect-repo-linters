'use strict';

const path = require('path');
const tryFiles = require('./util/tryFiles');
const tryPackageJson = require('./util/tryPackageJson');

function detectCssLint(dir) {
    const paths = ['.csslintrc']
    .map((entry) => path.join(dir, entry));

    return Promise.all([
        tryFiles(paths),
        tryPackageJson(dir, ['devDependencies.csslint']),
    ])
    .then((booleans) => booleans.some((bool) => bool));
}

module.exports = detectCssLint;
