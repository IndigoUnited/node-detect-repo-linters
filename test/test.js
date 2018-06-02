'use strict';

const fs = require('fs');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const expect = require('chai').expect;
const detectRepoLinters = require('../');

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
        expect(linters).to.eql(['editorconfig']);
    }

    return detectRepoLinters(tmpFolder)
    .then(assert);
});

it('should detect eslint', () => {
    function assert(linters) {
        expect(linters).to.eql(['eslint']);
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
    .then(assert)
    .then(() => {
        cleanTmpFolder();
        fs.writeFileSync(`${tmpFolder}/package.json`, JSON.stringify({ eslintIgnore: {} }));

        return detectRepoLinters(tmpFolder);
    })
    .then(assert)
    .then(() => {
        cleanTmpFolder();
        fs.writeFileSync(`${tmpFolder}/package.json`, JSON.stringify({ devDependencies: { eslint: '^x.x.x' } }));

        return detectRepoLinters(tmpFolder);
    })
    .then(assert);
});

it('should detect jscs', () => {
    function assert(linters) {
        expect(linters).to.eql(['jscs']);
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
        expect(linters).to.eql(['jshint']);
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
    .then(assert)
    .then(() => {
        cleanTmpFolder();
        fs.writeFileSync(`${tmpFolder}/package.json`, JSON.stringify({ devDependencies: { jshint: '^x.x.x' } }));

        return detectRepoLinters(tmpFolder);
    })
    .then(assert);
});

it('should detect stylelint', () => {
    function assert(linters) {
        expect(linters).to.eql(['stylelint']);
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
    .then(assert)
    .then(() => {
        cleanTmpFolder();
        fs.writeFileSync(`${tmpFolder}/package.json`, JSON.stringify({ devDependencies: { stylelint: '^x.x.x' } }));

        return detectRepoLinters(tmpFolder);
    })
    .then(assert);
});

it('should detect csslint', () => {
    function assert(linters) {
        expect(linters).to.eql(['csslint']);
    }

    cleanTmpFolder();
    fs.writeFileSync(`${tmpFolder}/.csslintrc`, '');

    return detectRepoLinters(tmpFolder)
    .then(assert)
    .then(() => {
        cleanTmpFolder();
        fs.writeFileSync(`${tmpFolder}/package.json`, JSON.stringify({ devDependencies: { csslint: '^x.x.x' } }));

        return detectRepoLinters(tmpFolder);
    })
    .then(assert);
});

it('should detect htmlhint', () => {
    function assert(linters) {
        expect(linters).to.eql(['htmlhint']);
    }

    cleanTmpFolder();
    fs.writeFileSync(`${tmpFolder}/.htmlhintrc`, '');

    return detectRepoLinters(tmpFolder)
    .then(assert)
    .then(() => {
        cleanTmpFolder();
        fs.writeFileSync(`${tmpFolder}/package.json`, JSON.stringify({ devDependencies: { htmlhint: '^x.x.x' } }));

        return detectRepoLinters(tmpFolder);
    })
    .then(assert);
});

it('should detect htmllint', () => {
    function assert(linters) {
        expect(linters).to.eql(['htmllint']);
    }

    cleanTmpFolder();
    fs.writeFileSync(`${tmpFolder}/.htmllintrc`, '');

    return detectRepoLinters(tmpFolder)
    .then(assert);
});

it('should detect coffeelint', () => {
    cleanTmpFolder();
    fs.writeFileSync(`${tmpFolder}/coffeelint.json`, '');

    function assert(linters) {
        expect(linters).to.eql(['coffeelint']);
    }

    return detectRepoLinters(tmpFolder)
    .then(assert)
    .then(() => {
        cleanTmpFolder();
        fs.writeFileSync(`${tmpFolder}/package.json`, JSON.stringify({ coffeelintConfig: {} }));
        return detectRepoLinters(tmpFolder);
    })
    .then(assert)
    .then(() => {
        cleanTmpFolder();
        fs.writeFileSync(`${tmpFolder}/package.json`, JSON.stringify({ devDependencies: { coffeelint: '^x.x.x' } }));

        return detectRepoLinters(tmpFolder);
    })
    .then(assert);
});

it('should detect tslint', () => {
    function assert(linters) {
        expect(linters).to.eql(['tslint']);
    }

    cleanTmpFolder();
    fs.writeFileSync(`${tmpFolder}/tslint.json`, '');

    return detectRepoLinters(tmpFolder)
    .then(assert)
    .then(() => {
        cleanTmpFolder();
        fs.writeFileSync(`${tmpFolder}/package.json`, JSON.stringify({ devDependencies: { tslint: '^x.x.x' } }));

        return detectRepoLinters(tmpFolder);
    })
    .then(assert);
});

it('should detect prettier', () => {
    function assert(linters) {
        expect(linters).to.eql(['prettier']);
    }

    return ['.prettierrc', '.prettierrc.yaml', '.prettierrc.yml', '.prettierrc.json', '.prettierrc.js', 'prettier.config.js']
        .reduce((promise, file) => promise
            .then(() => {
                cleanTmpFolder();
                fs.writeFileSync(`${tmpFolder}/${file}`, '');
                return detectRepoLinters(tmpFolder);
            })
            .then(assert)
            , Promise.resolve())
        .then(() => {
            cleanTmpFolder();
            fs.writeFileSync(`${tmpFolder}/package.json`, JSON.stringify({ prettier: {} }));
            return detectRepoLinters(tmpFolder);
        })
        .then(assert)
        .then(() => {
            cleanTmpFolder();
            fs.writeFileSync(`${tmpFolder}/package.json`, JSON.stringify({ devDependencies: { prettier: '^x.x.x' } }));

            return detectRepoLinters(tmpFolder);
        })
        .then(assert);
});

it('should detect standard', () => {
    function assert(linters) {
        expect(linters).to.eql(['standard']);
    }

    cleanTmpFolder();
    fs.writeFileSync(`${tmpFolder}/package.json`, JSON.stringify({ devDependencies: { standard: '^x.x.x' } }));

    return detectRepoLinters(tmpFolder)
    .then(assert)
    .then(() => {
        cleanTmpFolder();
        fs.writeFileSync(`${tmpFolder}/package.json`, JSON.stringify({ standard: {} }));

        return detectRepoLinters(tmpFolder);
    })
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
    fs.writeFileSync(`${tmpFolder}/coffeelint.json`, '');
    fs.writeFileSync(`${tmpFolder}/tslint.json`, '');

    return detectRepoLinters(tmpFolder)
    .then((linters) => {
        expect(linters).to.eql(['coffeelint', 'csslint', 'editorconfig', 'eslint', 'htmlhint', 'htmllint', 'jshint',
            'stylelint', 'tslint']);
    });
});

it('should ignore linter config files that are actually directories', () => {
    cleanTmpFolder();
    fs.mkdirSync(`${tmpFolder}/.editorconfig`);
    fs.mkdirSync(`${tmpFolder}/.eslintrc.json`);
    fs.mkdirSync(`${tmpFolder}/.jshintrc`);
    fs.mkdirSync(`${tmpFolder}/.stylelintrc`);
    fs.mkdirSync(`${tmpFolder}/.csslintrc`);
    fs.mkdirSync(`${tmpFolder}/.htmlhintrc`);
    fs.mkdirSync(`${tmpFolder}/.htmllintrc`);
    fs.mkdirSync(`${tmpFolder}/coffeelint.json`);
    fs.mkdirSync(`${tmpFolder}/tslint.json`);

    return detectRepoLinters(tmpFolder)
    .then((linters) => {
        expect(linters).to.eql([]);
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
