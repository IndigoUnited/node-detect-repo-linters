'use strict';

const fs = require('fs');
const requireDirectory = require('require-directory');
const detectors = requireDirectory(module, './lib', { recurse: false });

const lintersByType = {
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
    coffee: [
      { name: 'coffeelint', fn: detectors.coffeelint },
    ],
    ts: [
      { name: 'tslint', fn: detectors.tslint },
    ],
    prettier: [
      { name: 'prettier', fn: detectors.prettier },
    ],
};
const linterTypes = Object.keys(lintersByType);

function detectLinters(dir, linters) {
    return Promise.all(linters.map((linter) => linter.fn(dir)))
    .then((results) => {
        return linters
        .filter((linter, index) => results[index])
        .map((linter) => linter.name);
    });
}

function detectRepoLinters(dir) {
    // Check if dir exists
    return new Promise((resolve, reject) => {
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
        const promises = linterTypes.map((type) => detectLinters(dir, lintersByType[type]));

        return Promise.all(promises)
        .then((results) => {
            const ret = {};
            return results.concat.apply([], results);
        });
    });
}

module.exports = detectRepoLinters;
