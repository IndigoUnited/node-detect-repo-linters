'use strict';

const path = require('path');
const tryFiles = require('./util/tryFiles');
const tryPackageJson = require('./util/tryPackageJson');

function detectStyleLint(dir) {
    const paths = ['.stylelintrc.js', '.stylelintrc.yaml', '.stylelintrc.json', '.stylelintrc']
    .map((entry) => path.join(dir, entry));

    return Promise.all([
        tryFiles(paths),
        tryPackageJson(dir, ['devDependencies.stylelint', 'stylelint']),
    ])
    .then((booleans) => booleans.some((bool) => bool));
}

module.exports = detectStyleLint;
