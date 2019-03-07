'use strict';

const faker = require('faker');

module.exports = {
    up: (queryInterface, Sequelize) => {
        const authors = Array.from(Array(400)).map(() => {
            return {
                name: faker.lorem.words(3),
                createdAt: new Date(),
                updatedAt: new Date()
            };
        });

        return queryInterface.bulkInsert('Authors', authors, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Authors', null, {});
    }
};