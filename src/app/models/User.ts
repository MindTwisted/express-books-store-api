import bcrypt from 'bcrypt';
import { Model, Column, Table, DataType, BeforeSave } from 'sequelize-typescript';

@Table({
    timestamps: true,
})
export class User extends Model<User> {
    @BeforeSave
    private static hashPassword(instance: User) {
        return bcrypt.hash(instance.password, 10).then((hash: string) => {
            instance.password = hash;
        });
    }

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            len: [6, 255],
        },
    })
    public name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
            isUnique(value: any, next: any) {
                User.findOne({
                    where: {
                        email: value,
                    },
                    attributes: ['id'],
                })
                    .then((user: User | null) => {
                        if (user) {
                            return next('This email is already in use.');
                        }

                        next();
                    })
                    .catch(() => next('Unexpected error occurred. Please try again later.'));
            },
        },
    })
    public email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            len: [6, 255],
        },
    })
    public password: string;

    @Column({
        type: DataType.ENUM,
        values: ['admin', 'user'],
        defaultValue: 'user',
        allowNull: false,
    })
    public role: string;

    @Column({
        type: DataType.DECIMAL(8, 2),
        defaultValue: 0.0,
        allowNull: false,
    })
    public discount: number;

    public toJSON() {
        const values: any = Object.assign({}, this.get());

        delete values.password;
        delete values.createdAt;
        delete values.updatedAt;

        return values;
    }
}
