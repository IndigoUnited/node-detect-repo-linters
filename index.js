'use strict';

const fs = require('fs');
const requireDirectory = require('require-directory');
const callMeMaybe = require('call-me-maybe');
const detectors = requireDirectory(module, './lib', { recurse: false });

const linters = {
    general: [
        { name: 'editorconfig', fn: detectors.editorconfig },
    ],
    js: [
        { name: 'eslint', fn: detectors.eslint },
        { name: 'jscs', fn: detectors.jscs },
        { name: 'jshint', fn: detectors.jshint },
    ],
    css: [
        { name: 'stylelint', fn: detectors.stylelint },
        { name: 'csslint', fn: detectors.csslint },
    ],
    html: [
        { name: 'htmlhint', fn: detectors.htmlhint },
        { name: 'htmllint', fn: detectors.htmllint },
    ],
};

function detectLinters(dir, linters) {
    return Promise.all(linters.map((linter) => linter.fn(dir)))
    .then((results) => {
        return linters
        .filter((linter, index) => results[index])
        .map((linter) => linter.name);
    });
}

function detectRepoLinters(dir, callback) {
    // Check if dir exists
    const promise = new Promise((resolve, reject) => {
        fs.stat(dir, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    })
    // Run the linter detectors and build the results
    .then(() => {
        const types = Object.keys(linters);
        const promises = types.map((type) => detectLinters(dir, linters[type]));

        return Promise.all(promises)
        .then((results) => {
            const ret = {};

            results.forEach((result, index) => {
                ret[types[index]] = result;
            });

            return ret;
        });
    });

    return callMeMaybe(callback, promise);
}

module.exports = detectRepoLinters;
