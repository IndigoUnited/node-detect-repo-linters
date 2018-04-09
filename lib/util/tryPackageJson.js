'use strict';

const path = require('path');
const loadJsonFile = require('load-json-file');

function tryPackageJson(dir, props) {
    return loadJsonFile(path.join(dir, 'package.json'))
    .then((json) => {
        return props.some((prop) => {
            const hasConfig = !!json[prop];
            let hasDep = false;

            if (json.dependencies) {
                hasDep = (typeof json.dependencies[prop] === 'string');
            } else if (json.devDependencies) {
                hasDep = (typeof json.devDependencies[prop] === 'string');
            }

            return hasConfig || hasDep;
        });
    }, (err) => {
        if (err.code === 'ENOENT') {
            return false;
        }

        throw err;
    });
}

module.exports = tryPackageJson;
