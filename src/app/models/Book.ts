import { Model, Column, Table, DataType, BelongsToMany } from 'sequelize-typescript';
import { Author } from '@models/Author';
import { Genre } from '@models/Genre';
import { BookAuthor } from '@models/BookAuthor';
import { BookGenre } from '@models/BookGenre';

@Table({
    timestamps: true,
})
export class Book extends Model<Book> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            len: [6, 255],
            isUnique(value: any, next: any) {
                Book.findOne({
                    where: {
                        title: value,
                    },
                    attributes: ['id'],
                })
                    .then((book: Book | null) => {
                        if (book) {
                            return next('This book is already exists.');
                        }

                        next();
                    })
                    .catch(() => next('Unexpected error occurred. Please try again later.'));
            },
        },
    })
    public title: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
        validate: {
            len: [20, 5000],
        },
    })
    public description: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        defaultValue: null,
    })
    public imagePath: string;

    @Column({
        type: DataType.DECIMAL(8, 2),
        allowNull: false,
    })
    public price: number;

    @Column({
        type: DataType.DECIMAL(8, 2),
        allowNull: false,
        defaultValue: 0.0,
    })
    public discount: number;

    @BelongsToMany(() => Author, () => BookAuthor)
    public authors?: Author[];

    @BelongsToMany(() => Genre, () => BookGenre)
    public genres?: Genre[];

    public toJSON() {
        const values: any = Object.assign({}, this.get());

        delete values.createdAt;
        delete values.updatedAt;

        return values;
    }
}
