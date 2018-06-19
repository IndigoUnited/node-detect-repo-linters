'use strict';

const path = require('path');
const tryFiles = require('./util/tryFiles');

function detectHtmlHint(dir) {
    const paths = ['.htmllintrc']
    .map((entry) => path.join(dir, entry));

    // htmllint doesn't run without a config file, so no need to
    // check dependencies
    return tryFiles(paths);
}

module.exports = detectHtmlHint;
