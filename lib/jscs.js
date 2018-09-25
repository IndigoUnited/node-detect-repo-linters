'use strict';

const path = require('path');
const tryFiles = require('./util/tryFiles');
const tryPackageJson = require('./util/tryPackageJson');

function detectJscs(dir, loadPackageJson) {
    const paths = ['.jscsrc', '.jscs.json']
    .map((entry) => path.join(dir, entry));

    return Promise.all([
        tryFiles(paths),
        tryPackageJson(loadPackageJson, ['jscsConfig']),
    ])
    .then((booleans) => booleans.some((bool) => bool));
}

module.exports = detectJscs;
