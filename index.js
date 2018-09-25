'use strict';

const fs = require('fs');
const path = require('path');
const loadJsonFile = require('load-json-file');
const requireDirectory = require('require-directory');
const detectors = requireDirectory(module, './lib', { recurse: false });

function createLoadPackageJson(dir) {
    let packageJsonPromise;

    return () => {
        if (!packageJsonPromise) {
            packageJsonPromise = loadJsonFile(path.join(dir, 'package.json'))
            .catch((err) => {
                if (err.code === 'ENOENT') {
                    return null;
                }

                throw err;
            });
        }

        return packageJsonPromise;
    };
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
        const loadPackageJson = createLoadPackageJson(dir);

        return Promise.all(
            Object.keys(detectors)
            .map((name) => detectors[name](dir, loadPackageJson)
            .then((detected) => detected && name))
        );
    })
    .then((linters) => linters.filter((linter) => linter));
}

module.exports = detectRepoLinters;
