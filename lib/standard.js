'use strict';

const tryPackageJson = require('./util/tryPackageJson');

function detectStandardLint(dir, loadPackageJson) {
    return tryPackageJson(loadPackageJson, ['devDependencies.standard', 'standard']);
}

module.exports = detectStandardLint;
