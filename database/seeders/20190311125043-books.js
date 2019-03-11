'use strict';

const faker = require('faker');

module.exports = {
    up: (queryInterface, Sequelize) => {
        const uniqueTitles = {};

        while (Object.keys(uniqueTitles).length !== 1000) {
            const title = faker.lorem.words(3);

            uniqueTitles[title] = true;
        }

        const books = Object.keys(uniqueTitles).map(title => {
            return {
                title,
                description: faker.lorem.sentences(5),
                price: faker.random.number({min: 10, max: 50}),
                discount: faker.random.number({min: 0, max: 20}),
                createdAt: new Date(),
                updatedAt: new Date()
            };
        });

        return queryInterface.bulkInsert('Books', books, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Books', null, {});
    }
};