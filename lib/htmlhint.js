'use strict';

const path = require('path');
const tryFiles = require('./util/tryFiles');
const tryPackageJson = require('./util/tryPackageJson');

function detectHtmlHint(dir) {
    const paths = ['.htmlhintrc']
    .map((entry) => path.join(dir, entry));

    return Promise.all([
        tryFiles(paths),
        tryPackageJson(dir, ['devDependencies.htmlhint']),
    ])
    .then((booleans) => booleans.some((bool) => bool));
}

module.exports = detectHtmlHint;
