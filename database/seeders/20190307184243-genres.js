'use strict';

const faker = require('faker');

module.exports = {
    up: (queryInterface, Sequelize) => {
        const genres = Array.from(Array(100)).map(() => {
            return {
                name: faker.lorem.words(3),
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