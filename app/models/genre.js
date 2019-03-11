'use strict';

module.exports = (sequelize, DataTypes) => {
    const Genre = sequelize.define('Genre', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    min: 6
                },
                isUnique(value, next) {
                    Genre.find({
                            where: {
                                name: value
                            },
                            attributes: ['id']
                        })
                        .then(genre => {
                            if (genre) {
                                return next('This genre is already exists.');
                            }

                            next();
                        })
                        .catch(() => next('Unexpected error occurred. Please try again later.'));
                }
            }
        }
    }, {});

    Genre.associate = function (models) {
        models.Genre.belongsToMany(models.Book, {through: 'BookGenre'});
    };

    Genre.prototype.toJSON = function () {
        const values = Object.assign({}, this.get());

        delete values.createdAt;
        delete values.updatedAt;

        return values;
    };
    
    return Genre;
};