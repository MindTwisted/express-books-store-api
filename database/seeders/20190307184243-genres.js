'use strict';

const faker = require('faker');

module.exports = {
    up: (queryInterface, Sequelize) => {
        const uniqueNames = {};

        while (Object.keys(uniqueNames).length !== 100) {
            const name = faker.lorem.words(3);

            uniqueNames[name] = true;
        }

        const genres = Object.keys(uniqueNames).map(name => {
            return {
                name,
                createdAt: new Date(),
                updatedAt: new Date()
            };
        });

        return queryInterface.bulkInsert('Genres', genres, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Genres', null, {});
    }
};