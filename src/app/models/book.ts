'use strict';

module.exports = (sequelize: any, DataTypes: any) => {
    const Book = sequelize.define('Book', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    min: 6
                },
                isUnique(value: any, next: any) {
                    Book.find({
                            where: {
                                title: value
                            },
                            attributes: ['id']
                        })
                        .then((book: any) => {
                            if (book) {
                                return next('This book is already exists.');
                            }

                            next();
                        })
                        .catch(() => next('Unexpected error occurred. Please try again later.'));
                }
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: {
                    min: 20
                }
            }
        },
        imagePath: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        price: {
            type: DataTypes.DECIMAL(8, 2),
            allowNull: false
        },
        discount: {
            type: DataTypes.DECIMAL(8, 2),
            allowNull: false,
            defaultValue: '0.00'
        }
    }, {});

    Book.associate = function (models: any) {
        models.Book.belongsToMany(models.Author, {through: 'BookAuthor'});
        models.Book.belongsToMany(models.Genre, {through: 'BookGenre'});
    };

    Book.prototype.toJSON = function () {
        const values = Object.assign({}, this.get());

        delete values.createdAt;
        delete values.updatedAt;

        return values;
    };
    
    return Book;
};