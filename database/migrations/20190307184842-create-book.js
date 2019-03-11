'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Books', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: true
            },
            description: {
                allowNull: false,
                type: Sequelize.TEXT
            },
            imagePath: {
                allowNull: true,
                type: Sequelize.STRING,
                defaultValue: null
            },
            price: {
                allowNull: false,
                type: Sequelize.DECIMAL(8, 2)
            },
            discount: {
                allowNull: false,
                type: Sequelize.DECIMAL(8, 2),
                defaultValue: '0.00'
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
        return queryInterface.dropTable('Books');
    }
};