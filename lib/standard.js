'use strict';

const tryPackageJson = require('./util/tryPackageJson');

function detectStandardLint(dir) {
    return tryPackageJson(dir, ['standard']);
}

module.exports = detectStandardLint;
