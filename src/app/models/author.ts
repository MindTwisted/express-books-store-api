'use strict';

module.exports = (sequelize: any, DataTypes: any) => {
    const Author = sequelize.define('Author', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    min: 6
                },
                isUnique(value: any, next: Function) {
                    Author.find({
                            where: {
                                name: value
                            },
                            attributes: ['id']
                        })
                        .then((author: any) => {
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

    Author.associate = function (models: any) {
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