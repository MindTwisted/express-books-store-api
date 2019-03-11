'use strict';

module.exports = (sequelize, DataTypes) => {
    const Author = sequelize.define('Author', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    min: 6
                },
                isUnique(value, next) {
                    Author.find({
                            where: {
                                name: value
                            },
                            attributes: ['id']
                        })
                        .then(author => {
                            if (author) {
                                return next('This author is already exists.');
                            }

                            next();
                        })
                        .catch(() => next('Unexpected error occurred. Please try again later.'));
                }
            }
        }
    }, {});

    Author.associate = function (models) {
        models.Author.belongsToMany(models.Book, {through: 'BookAuthor'});
    };

    Author.prototype.toJSON = function () {
        const values = Object.assign({}, this.get());

        delete values.createdAt;
        delete values.updatedAt;

        return values;
    };
    
    return Author;
};