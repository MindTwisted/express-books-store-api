'use strict';

const spawn = require('child-process-promise').spawn;
const spawnOptions = { stdio: 'inherit' };

/**
 * Prepare before tests
 */
before(done => {
    spawn('npm', ['run', 'sequelize', 'db:create'], spawnOptions)
        .then(() => spawn('npm', ['run', 'sequelize', 'db:migrate'], spawnOptions))
        .then(() => spawn('npm', ['run', 'sequelize', 'db:seed:all'], spawnOptions))
        .then(() => done());
});

/**
 * Tear down after tests
 */
after(done => {
    spawn('npm', ['run', 'sequelize', 'db:drop'], spawnOptions)
        .then(() => done());
});