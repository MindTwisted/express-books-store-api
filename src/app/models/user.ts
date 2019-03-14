import bcrypt from 'bcrypt';

module.exports = (sequelize: any, DataTypes: any) => {
    const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    min: 6
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
                isUnique(value: any, next: any) {
                    User.find({
                            where: {
                                email: value
                            },
                            attributes: ['id']
                        })
                        .then((user: any) => {
                            if (user) {
                                return next('This email is already in use.');
                            }

                            next();
                        })
                        .catch(() => next('Unexpected error occurred. Please try again later.'));
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    min: 6
                }
            }
        },
        role: {
            type: DataTypes.ENUM,
            values: ['admin', 'user'],
            defaultValue: 'user',
            allowNull: false
        },
        discount: {
            type: DataTypes.DECIMAL(8, 2),
            defaultValue: '0.00',
            allowNull: false
        }
    }, {
        hooks: {
            beforeSave(instance: any, options: any) {
                return bcrypt.hash(instance.password, 10)
                    .then((hash: any) => {
                        instance.password = hash;
                    });
            }
        }
    });

    User.associate = function (models: any) {
        // associations can be defined here
    };

    User.prototype.toJSON = function () {
        const values = Object.assign({}, this.get());

        delete values.password;
        delete values.createdAt;
        delete values.updatedAt;

        return values;
    };

    return User;
};