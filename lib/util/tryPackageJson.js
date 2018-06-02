'use strict';

const path = require('path');
const loadJsonFile = require('load-json-file');

function objectPath(obj, propPath) {
    const props = propPath.split('.');
    const propsLength = props.length;
    let target = obj;
    let result;

    for (let i = 0; i < propsLength; i += 1) {
        const prop = props[i];

        if (target[prop]) {
            const value = target[prop];

            if (i === (propsLength - 1)) {
                result = value;
            } else {
                target = value;
            }
        } else {
            break;
        }
    }

    return result;
}

function tryPackageJson(dir, props) {
    return loadJsonFile(path.join(dir, 'package.json'))
    .then((json) => {
        return props.some((prop) => objectPath(json, prop));
    }, (err) => {
        if (err.code === 'ENOENT') {
            return false;
        }

        throw err;
    });
}

module.exports = tryPackageJson;
