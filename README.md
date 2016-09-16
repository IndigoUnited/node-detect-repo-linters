# detect-repo-linters

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

[npm-url]:https://npmjs.org/package/detect-repo-linters
[downloads-image]:http://img.shields.io/npm/dm/detect-repo-linters.svg
[npm-image]:http://img.shields.io/npm/v/detect-repo-linters.svg
[travis-url]:https://travis-ci.org/IndigoUnited/node-detect-repo-linters
[travis-image]:http://img.shields.io/travis/IndigoUnited/node-detect-repo-linters/master.svg
[coveralls-url]:https://coveralls.io/r/IndigoUnited/node-detect-repo-linters
[coveralls-image]:https://img.shields.io/coveralls/IndigoUnited/node-detect-repo-linters/master.svg
[david-dm-url]:https://david-dm.org/IndigoUnited/node-detect-repo-linters
[david-dm-image]:https://img.shields.io/david/IndigoUnited/node-detect-repo-linters.svg
[david-dm-dev-url]:https://david-dm.org/IndigoUnited/node-detect-repo-linters#info=devDependencies
[david-dm-dev-image]:https://img.shields.io/david/dev/IndigoUnited/node-detect-repo-linters.svg

Scans a repository directory, searching for configured linters.


## Installation

`$ npm install detect-repo-linters`


## Usage

`detectRepoLinters(dir, [callback]) -> Promise`

You may consume the result using promises or callbacks, it's up to you.

```js
const detectRepoLinters = require('detect-repo-linters');

detectRepoLinters('./some-repository-directory')
.then((linters) => {
    // linters is an object that looks like:
    // {
    //     general: ['editorconfig'],
    //     js: ['eslint'],
    //     css: ['stylelint'],
    //     html: [],
    // }
});
```

At the moment the following linters are detected:

- general: [editorconfig](http://editorconfig.org)
- js: [eslint](http://eslint.org), [jscs](http://jscs.info) and [jshint](http://jshint.com)
- css: [stylelint](http://stylelint.io) and [csslint](http://csslint.net)
- html: [htmlhint](http://htmlhint.com) and [htmllint](http://htmllint.github.io)

Feel free to a PR to include other linters as part of the detection!


## Tests

`$ npm test`   
`$ npm test-cov` to get coverage report


## License

Released under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
