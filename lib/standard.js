'use strict';

const tryPackageJson = require('./util/tryPackageJson');

function detectStandardLint(dir) {
    return tryPackageJson(dir, ['devDependencies.standard', 'standard']);
}

module.exports = detectStandardLint;
