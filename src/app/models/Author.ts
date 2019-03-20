import { Model, Column, Table, DataType, BelongsToMany } from 'sequelize-typescript';
import { Book } from '@models/Book';
import { BookAuthor } from '@models/BookAuthor';

@Table({
    timestamps: true,
})
export class Author extends Model<Author> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            len: [6, 255],
            isUnique(value: any, next: Function) {
                Author.findOne({
                    where: {
                        name: value,
                    },
                    attributes: ['id'],
                })
                    .then((author: Author | null) => {
                        if (author) {
                            return next('This author is already exists.');
                        }

                        next();
                    })
                    .catch(() => next('Unexpected error occurred. Please try again later.'));
            },
        },
    })
    public name: string;

    @BelongsToMany(() => Book, () => BookAuthor)
    public books?: Book[];

    public toJSON() {
        const values: any = Object.assign({}, this.get());

        delete values.createdAt;
        delete values.updatedAt;

        return values;
    }
}
