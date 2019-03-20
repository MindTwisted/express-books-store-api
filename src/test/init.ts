const spawn = require('child-process-promise').spawn;
const spawnOptions = { stdio: 'inherit' };

/**
 * Prepare before tests
 */
before(async () => {
    await spawn('npm', ['run', 'sequelize', 'db:create'], spawnOptions);
    await spawn('npm', ['run', 'sequelize', 'db:migrate'], spawnOptions);
    await spawn('npm', ['run', 'sequelize', 'db:seed:all'], spawnOptions);
});

/**
 * Tear down after tests
 */
after(async () => {
    await spawn('npm', ['run', 'sequelize', 'db:drop'], spawnOptions);
});
