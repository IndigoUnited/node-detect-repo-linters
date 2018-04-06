'use strict';

const path = require('path');
const tryFiles = require('./util/tryFiles');
const tryPackageJson = require('./util/tryPackageJson');

function detectEslint(dir) {
    const paths = ['.eslintrc.js', '.eslintrc.yaml', '.eslintrc.yml', '.eslintrc.json', '.eslintrc']
    .map((entry) => path.join(dir, entry));

    return Promise.all([
        tryFiles(paths),
        tryPackageJson(dir, ['eslint', 'eslintConfig', 'eslintIgnore']),
    ])
    .then((booleans) => booleans.some((bool) => bool));
}

module.exports = detectEslint;
