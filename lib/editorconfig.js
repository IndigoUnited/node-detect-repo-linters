'use strict';

const path = require('path');
const tryFiles = require('./util/tryFiles');

function detectEditorConfig(dir) {
    const paths = ['.editorconfig'].map((entry) => path.join(dir, entry));

    return tryFiles(paths);
}

module.exports = detectEditorConfig;
