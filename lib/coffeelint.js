'use strict';

const path = require('path');
const tryFiles = require('./util/tryFiles');
const tryPackageJson = require('./util/tryPackageJson');

function detectCoffeeLint(dir, loadPackageJson) {
    const paths = ['coffeelint.json']
    .map((entry) => path.join(dir, entry));

    return Promise.all([
        tryFiles(paths),
        tryPackageJson(loadPackageJson, ['coffeelintConfig', 'devDependencies.coffeelint']),
    ])
    .then((booleans) => booleans.some((bool) => bool));
}

module.exports = detectCoffeeLint;
