import { Model, Column, Table, DataType, BelongsToMany, Scopes } from 'sequelize-typescript';
import Bluebird from 'bluebird';
import { Op } from 'sequelize';
import Author from '@models/Author';
import Genre from '@models/Genre';
import BookAuthor from '@models/BookAuthor';
import BookGenre from '@models/BookGenre';

@Scopes({
    full: (data: { authors?: string | string[]; genres?: string | string[] } = {}) => {
        let { authors, genres } = data;
        let authorsWhereClause = {};
        let genresWhereClause = {};

        if (authors) {
            authors = Array.isArray(authors) ? authors.join(',').split(',') : authors.split(',');
            authorsWhereClause = { where: { id: { [Op.in]: authors } } };
        }

        if (genres) {
            genres = Array.isArray(genres) ? genres.join(',').split(',') : genres.split(',');
            genresWhereClause = { where: { id: { [Op.in]: genres } } };
        }

        return {
            include: [
                {
                    model: Author,
                    through: { attributes: [] },
                    ...authorsWhereClause,
                },
                {
                    model: Genre,
                    through: { attributes: [] },
                    ...genresWhereClause,
                },
            ],
        };
    },
})
@Table({
    timestamps: true,
})
export default class Book extends Model<Book> {
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
        validate: {
            min: 0,
            isNumeric: true,
        },
    })
    public price: number;

    @Column({
        type: DataType.DECIMAL(8, 2),
        allowNull: false,
        defaultValue: 0.0,
        validate: {
            min: 0,
            max: 50,
            isNumeric: true,
        },
    })
    public discount: number;

    @BelongsToMany(() => Author, () => BookAuthor)
    public authors?: Author[];

    @BelongsToMany(() => Genre, () => BookGenre)
    public genres?: Genre[];

    public setAuthors(authors: Author[] | null) {
        const bulkCreateValues: { bookId: number; authorId: number }[] | null = authors
            ? authors.map((author: Author) => ({ bookId: this.id, authorId: author.id }))
            : null;

        return BookAuthor.destroy({ where: { bookId: this.id } }).then(() => {
            if (!bulkCreateValues) {
                return Bluebird.resolve(null);
            }

            return BookAuthor.bulkCreate(bulkCreateValues);
        });
    }

    public setGenres(genres: Genre[] | null) {
        const bulkCreateValues: { bookId: number; genreId: number }[] | null = genres
            ? genres.map((genre: Genre) => ({ bookId: this.id, genreId: genre.id }))
            : null;

        return BookGenre.destroy({ where: { bookId: this.id } }).then(() => {
            if (!bulkCreateValues) {
                return Bluebird.resolve(null);
            }

            return BookGenre.bulkCreate(bulkCreateValues);
        });
    }

    public toJSON() {
        const values: any = Object.assign({}, this.get());

        delete values.createdAt;
        delete values.updatedAt;

        return values;
    }
}
