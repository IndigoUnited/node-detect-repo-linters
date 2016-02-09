'use strict';

const fs = require('fs');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const expect = require('chai').expect;
const detectRepoLinters = require('../');

describe('detect-repo-linters', () => {
    const tmpFolder = `${__dirname}/tmp`;

    function cleanTmpFolder() {
        rimraf.sync(tmpFolder);
        mkdirp.sync(tmpFolder);
    }

    afterEach(() => rimraf.sync(tmpFolder));

    it('should detect editorconfig', () => {
        cleanTmpFolder();
        fs.writeFileSync(`${tmpFolder}/.editorconfig`, '');

        function assert(linters) {
            expect(linters).to.eql({ general: ['editorconfig'], js: [], css: [], html: [] });
        }

        return detectRepoLinters(tmpFolder)
        .then(assert);
    });

    it('should detect eslint', () => {
        function assert(linters) {
            expect(linters).to.eql({ general: [], js: ['eslint'], css: [], html: [] });
        }

        cleanTmpFolder();
        fs.writeFileSync(`${tmpFolder}/.eslintrc`, '');

        return detectRepoLinters(tmpFolder)
        .then(assert)
        .then(() => {
            cleanTmpFolder();
            fs.writeFileSync(`${tmpFolder}/.eslintrc.json`, '');

            return detectRepoLinters(tmpFolder);
        })
        .then(assert)
        .then(() => {
            cleanTmpFolder();
            fs.writeFileSync(`${tmpFolder}/.eslintrc.js`, '');

            return detectRepoLinters(tmpFolder);
        })
        .then(assert)
        .then(() => {
            cleanTmpFolder();
            fs.writeFileSync(`${tmpFolder}/.eslintrc.yml`, '');

            return detectRepoLinters(tmpFolder);
        })
        .then(assert)
        .then(() => {
            cleanTmpFolder();
            fs.writeFileSync(`${tmpFolder}/.eslintrc.yaml`, '');

            return detectRepoLinters(tmpFolder);
        })
        .then(assert)
        .then(() => {
            cleanTmpFolder();
            fs.writeFileSync(`${tmpFolder}/package.json`, JSON.stringify({ eslintConfig: {} }));

            return detectRepoLinters(tmpFolder);
        })
        .then(assert);
    });

    it('should detect jscs', () => {
        function assert(linters) {
            expect(linters).to.eql({ general: [], js: ['jscs'], css: [], html: [] });
        }

        cleanTmpFolder();
        fs.writeFileSync(`${tmpFolder}/.jscsrc`, '');

        return detectRepoLinters(tmpFolder)
        .then(assert)
        .then(() => {
            cleanTmpFolder();
            fs.writeFileSync(`${tmpFolder}/.jscs.json`, '');

            return detectRepoLinters(tmpFolder);
        })
        .then(assert)
        .then(() => {
            cleanTmpFolder();
            fs.writeFileSync(`${tmpFolder}/package.json`, JSON.stringify({ jscsConfig: {} }));

            return detectRepoLinters(tmpFolder);
        })
        .then(assert);
    });

    it('should detect jshint', () => {
        function assert(linters) {
            expect(linters).to.eql({ general: [], js: ['jshint'], css: [], html: [] });
        }

        cleanTmpFolder();
        fs.writeFileSync(`${tmpFolder}/.jshintrc`, '');

        return detectRepoLinters(tmpFolder)
        .then(assert)
        .then(() => {
            cleanTmpFolder();
            fs.writeFileSync(`${tmpFolder}/package.json`, JSON.stringify({ jshintConfig: {} }));

            return detectRepoLinters(tmpFolder);
        })
        .then(assert);
    });

    it('should detect stylelint', () => {
        function assert(linters) {
            expect(linters).to.eql({ general: [], js: [], css: ['stylelint'], html: [] });
        }

        cleanTmpFolder();
        fs.writeFileSync(`${tmpFolder}/.stylelintrc`, '');

        return detectRepoLinters(tmpFolder)
        .then(assert)
        .then(() => {
            cleanTmpFolder();
            fs.writeFileSync(`${tmpFolder}/.stylelintrc.json`, '');

            return detectRepoLinters(tmpFolder);
        })
        .then(assert)
        .then(() => {
            cleanTmpFolder();
            fs.writeFileSync(`${tmpFolder}/.stylelintrc.js`, '');

            return detectRepoLinters(tmpFolder);
        })
        .then(assert)
        .then(() => {
            cleanTmpFolder();
            fs.writeFileSync(`${tmpFolder}/.stylelintrc.yaml`, '');

            return detectRepoLinters(tmpFolder);
        })
        .then(assert)
        .then(() => {
            cleanTmpFolder();
            fs.writeFileSync(`${tmpFolder}/package.json`, JSON.stringify({ stylelint: {} }));

            return detectRepoLinters(tmpFolder);
        })
        .then(assert);
    });

    it('should detect csslint', () => {
        function assert(linters) {
            expect(linters).to.eql({ general: [], js: [], css: ['csslint'], html: [] });
        }

        cleanTmpFolder();
        fs.writeFileSync(`${tmpFolder}/.csslintrc`, '');

        return detectRepoLinters(tmpFolder)
        .then(assert);
    });

    it('should detect htmlhint', () => {
        function assert(linters) {
            expect(linters).to.eql({ general: [], js: [], css: [], html: ['htmlhint'] });
        }

        cleanTmpFolder();
        fs.writeFileSync(`${tmpFolder}/.htmlhintrc`, '');

        return detectRepoLinters(tmpFolder)
        .then(assert);
    });

    it('should detect htmllint', () => {
        function assert(linters) {
            expect(linters).to.eql({ general: [], js: [], css: [], html: ['htmllint'] });
        }

        cleanTmpFolder();
        fs.writeFileSync(`${tmpFolder}/.htmllintrc`, '');

        return detectRepoLinters(tmpFolder)
        .then(assert);
    });

    it('should detect several linters in a complex repository', () => {
        cleanTmpFolder();
        fs.writeFileSync(`${tmpFolder}/.editorconfig`, '');
        fs.writeFileSync(`${tmpFolder}/.eslintrc.json`, '');
        fs.writeFileSync(`${tmpFolder}/.jshintrc`, '');
        fs.writeFileSync(`${tmpFolder}/.stylelintrc`, '');
        fs.writeFileSync(`${tmpFolder}/.csslintrc`, '');
        fs.writeFileSync(`${tmpFolder}/.htmlhintrc`, '');
        fs.writeFileSync(`${tmpFolder}/.htmllintrc`, '');

        return detectRepoLinters(tmpFolder)
        .then((linters) => {
            expect(linters).to.eql({
                general: ['editorconfig'],
                js: ['eslint', 'jshint'],
                css: ['stylelint', 'csslint'],
                html: ['htmlhint', 'htmllint'],
            });
        });
    });

    it('should fail if dir does not exist', () => {
        return detectRepoLinters('some-dir-that-will-never-exist')
        .then(() => {
            throw new Error('expected to fail');
        }, (err) => {
            expect(err).to.be.an.instanceOf(Error);
            expect(err.code).to.equal('ENOENT');
        });
    });

    it('should fail if dir is not a directory', () => {
        return detectRepoLinters(`${__dirname}/../index.js`)
        .then(() => {
            throw new Error('expected to fail');
        }, (err) => {
            expect(err).to.be.an.instanceOf(Error);
            expect(err.code).to.equal('ENOTDIR');
        });
    });

    it('should support use of callbacks', (next) => {
        cleanTmpFolder();

        const ret = detectRepoLinters(tmpFolder, (err) => {
            if (err) {
                return next(err);
            }

            const ret = detectRepoLinters(`${__dirname}/../index.js`, (err) => {
                expect(err).to.be.an.instanceOf(Error);
                expect(err.code).to.equal('ENOTDIR');

                next();
            });

            expect(ret).to.equal(undefined);
        });

        expect(ret).to.equal(undefined);
    });
});
