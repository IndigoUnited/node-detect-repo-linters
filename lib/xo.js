'use strict';

const tryPackageJson = require('./util/tryPackageJson');

function detectXOLint(dir) {
    return tryPackageJson(dir, ['devDependencies.xo', 'xo']);
}

module.exports = detectXOLint;
