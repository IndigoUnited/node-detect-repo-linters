'use strict';

const path = require('path');
const tryFiles = require('./util/tryFiles');

function detectHtmlHint(dir) {
    const paths = ['.htmllintrc']
    .map((entry) => path.join(dir, entry));

    return tryFiles(paths);
}

module.exports = detectHtmlHint;
