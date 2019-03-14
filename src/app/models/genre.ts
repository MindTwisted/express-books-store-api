module.exports = (sequelize: any, DataTypes: any) => {
    const Genre = sequelize.define('Genre', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    min: 6
                },
                isUnique(value: any, next: Function) {
                    Genre.find({
                            where: {
                                name: value
                            },
                            attributes: ['id']
                        })
                        .then((genre: any) => {
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

    Genre.associate = function (models: any) {
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