'use strict';

const path = require('path');
const tryFiles = require('./util/tryFiles');
const tryPackageJson = require('./util/tryPackageJson');

function detectTsLint(dir, loadPackageJson) {
    const paths = ['tslint.json']
    .map((entry) => path.join(dir, entry));

    return Promise.all([
        tryFiles(paths),
        tryPackageJson(loadPackageJson, ['devDependencies.tslint']),
    ])
    .then((booleans) => booleans.some((bool) => bool));
}

module.exports = detectTsLint;
