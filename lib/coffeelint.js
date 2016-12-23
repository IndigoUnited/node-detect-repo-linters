'use strict';

const path = require('path');
const tryFiles = require('./util/tryFiles');
const tryPackageJson = require('./util/tryPackageJson');

function detectCoffeeLint(dir) {
    const paths = ['coffeelint.json']
    .map((entry) => path.join(dir, entry));

    return Promise.all([
        tryFiles(paths),
        tryPackageJson(dir, 'coffeelintConfig'),
    ])
    .then((booleans) => booleans.some((bool) => bool));
}

module.exports = detectCoffeeLint;
