import { Model, Column, Table, DataType, BelongsToMany } from 'sequelize-typescript';
import Book from '@models/Book';
import BookGenre from '@models/BookGenre';

@Table({
    timestamps: true,
})
export default class Genre extends Model<Genre> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            len: [6, 255],
            isUnique(value: any, next: Function) {
                Genre.findOne({
                    where: {
                        name: value,
                    },
                    attributes: ['id'],
                })
                    .then((genre: Genre | null) => {
                        if (genre) {
                            return next('This genre is already exists.');
                        }

                        next();
                    })
                    .catch(() => next('Unexpected error occurred. Please try again later.'));
            },
        },
    })
    public name: string;

    @BelongsToMany(() => Book, () => BookGenre)
    public books?: Book[];

    public toJSON() {
        const values: any = Object.assign({}, this.get());

        delete values.createdAt;
        delete values.updatedAt;

        return values;
    }
}
