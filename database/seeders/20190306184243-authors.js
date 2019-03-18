'use strict';

const faker = require('faker');

module.exports = {
    up: (queryInterface, Sequelize) => {
        const uniqueNames = {};

        while (Object.keys(uniqueNames).length !== 400) {
            const name = faker.name.firstName() + ' ' + faker.name.lastName();

            uniqueNames[name] = true;
        }

        const authors = Object.keys(uniqueNames).map(name => {
            return {
                name,
                createdAt: new Date(),
                updatedAt: new Date()
            };
        });

        Array.from(Array(10)).map((item, index) => {
            authors.push({
                name: `Author for testing ${index}`,
                createdAt: new Date(),
                updatedAt: new Date()
            });
        });

        return queryInterface.bulkInsert('Authors', authors, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Authors', null, {});
    }
};