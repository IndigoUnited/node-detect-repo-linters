'use strict';

const path = require('path');
const tryFiles = require('./util/tryFiles');

function detectCssLint(dir) {
    const paths = ['.csslintrc']
    .map((entry) => path.join(dir, entry));

    return tryFiles(paths);
}

module.exports = detectCssLint;
