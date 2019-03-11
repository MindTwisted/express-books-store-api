'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        const sequelize = queryInterface.sequelize;
        const books = sequelize.query('SELECT id FROM Books ORDER BY id', {type: sequelize.QueryTypes.SELECT});
        const genres = sequelize.query('SELECT id FROM Genres', {type: sequelize.QueryTypes.SELECT});

        return Promise.all([books, genres])
            .then(([books, genres]) => {
                const bookGenre = [];

                books.map(book => {
                    const uniqueGenres = {};

                    while (Object.keys(uniqueGenres).length !== 3) {
                        const id = genres[Math.floor(Math.random() * genres.length)].id;
            
                        uniqueGenres[id] = true;
                    }

                    Object.keys(uniqueGenres).map(genreId => {
                        bookGenre.push({
                            bookId: book.id,
                            genreId,
                            createdAt: new Date(),
                            updatedAt: new Date()
                        });
                    });
                });

                return queryInterface.bulkInsert('BookGenre', bookGenre, {});
            });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('BookGenre', null, {});
    }
};