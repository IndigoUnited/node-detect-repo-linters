'use strict';

const fs = require('fs');

function isFile(path) {
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, stats) => {
            if (!err) {
                return resolve(stats.isFile());
            }

            if (err.code === 'ENOENT') {
                return resolve(false);
            }

            reject(err);
        });
    });
}

function tryFiles(paths) {
    return Promise.all(paths.map((path) => isFile(path)))
    .then((results) => {
        const filteredResults = results.filter((exists) => exists);

        return !!filteredResults[0];
    });
}

module.exports = tryFiles;
