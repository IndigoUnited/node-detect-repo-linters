'use strict';

const path = require('path');
const tryFiles = require('./util/tryFiles');

function detectHtmlHint(dir) {
    const paths = ['.htmlhintrc']
    .map((entry) => path.join(dir, entry));

    return tryFiles(paths);
}

module.exports = detectHtmlHint;
