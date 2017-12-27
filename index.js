'use strict';

const fs = require('fs');
const requireDirectory = require('require-directory');
const detectors = requireDirectory(module, './lib', { recurse: false });

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
        return Promise.all(Object.keys(detectors)
            .map((name) => detectors[name](dir)
                .then((detected) => detected && name)));
    })
    .then((linters) => linters.filter((linter) => linter));
}

module.exports = detectRepoLinters;
