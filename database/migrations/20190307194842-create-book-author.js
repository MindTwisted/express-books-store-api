'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('BookAuthor', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            bookId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Books',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            authorId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Authors',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('BookAuthor');
    }
};