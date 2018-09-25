'use strict';

const tryPackageJson = require('./util/tryPackageJson');

function detectXOLint(dir, loadPackageJson) {
    return tryPackageJson(loadPackageJson, ['devDependencies.xo', 'xo']);
}

module.exports = detectXOLint;
