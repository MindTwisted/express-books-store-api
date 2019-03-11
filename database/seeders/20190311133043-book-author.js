'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        const sequelize = queryInterface.sequelize;
        const books = sequelize.query('SELECT id FROM Books ORDER BY id', {type: sequelize.QueryTypes.SELECT});
        const authors = sequelize.query('SELECT id FROM Authors', {type: sequelize.QueryTypes.SELECT});

        return Promise.all([books, authors])
            .then(([books, authors]) => {
                const bookAuthor = [];

                books.map(book => {
                    const uniqueAuthors = {};

                    while (Object.keys(uniqueAuthors).length !== 2) {
                        const id = authors[Math.floor(Math.random() * authors.length)].id;
            
                        uniqueAuthors[id] = true;
                    }

                    Object.keys(uniqueAuthors).map(authorId => {
                        bookAuthor.push({
                            bookId: book.id,
                            authorId,
                            createdAt: new Date(),
                            updatedAt: new Date()
                        });
                    });
                });

                return queryInterface.bulkInsert('BookAuthor', bookAuthor, {});
            });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('BookAuthor', null, {});
    }
};