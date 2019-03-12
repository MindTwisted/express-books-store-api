'use strict';

const spawn = require('child-process-promise').spawn;
const spawnOptions = { stdio: 'inherit' };

/**
 * Prepare before tests
 */
before(done => {
    spawn('node_modules/.bin/sequelize', ['db:create'], spawnOptions)
        .then(() => spawn('node_modules/.bin/sequelize', ['db:migrate'], spawnOptions))
        .then(() => spawn('node_modules/.bin/sequelize', ['db:seed:all'], spawnOptions))
        .then(() => done());
});

/**
 * Tear down after tests
 */
after(done => {
    spawn('node_modules/.bin/sequelize', ['db:drop'], spawnOptions)
        .then(() => done());
});