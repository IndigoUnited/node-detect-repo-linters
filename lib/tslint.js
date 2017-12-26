'use strict';

const path = require('path');
const tryFiles = require('./util/tryFiles');

function detectTsLint(dir) {
    const paths = ['tslint.json']
    .map((entry) => path.join(dir, entry));

    return Promise.all([
        tryFiles(paths),
    ])
    .then((booleans) => booleans.some((bool) => bool));
}

module.exports = detectTsLint;
