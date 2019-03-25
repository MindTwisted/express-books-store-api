import { Op } from 'sequelize';
import sequelize from '@models/sequelize';
import Bluebird from 'bluebird';
import Book from '@models/Book';
import Author from '@models/Author';
import Genre from '@models/Genre';
import RepositoryInterface from '@interfaces/RepositoryInterface';
import NotFoundError from '@errors/NotFoundError';

class BookRepository implements RepositoryInterface {
    /**
     * Query all books from DB
     *
     * @param data
     */
    public findAll(data: any): Bluebird<any> {
        const offset = parseInt(data.offset);
        const { search, authors, genres } = data;
        const whereClause = search ? { where: { title: { [Op.like]: `%${search}%` } } } : {};
        const offsetClause = offset ? { offset } : {};

        return Book.scope({ method: ['full', { authors, genres }] }).findAll({
            ...whereClause,
            limit: 50,
            ...offsetClause,
        });
    }

    /**
     * Query single book from DB by id
     *
     * @param data
     */
    public findOneById(id: number): Bluebird<any> {
        return Book.scope('full')
            .findOne({
                where: { id },
            })
            .then((book: Book | null) => {
                if (!book) {
                    return Bluebird.reject(new NotFoundError(`Book with id ${id} doesn't exist.`));
                }

                return Bluebird.resolve(book);
            });
    }

    /**
     * Query single book from DB
     *
     * @param data
     */
    public findOne(data: any): Bluebird<any> {
        return Bluebird.resolve();
    }

    /**
     * Store book to DB
     *
     * @param data
     */
    public create(data: any): Bluebird<any> {
        const { title, description, price, discount, authors = '', genres = '' } = data;

        return sequelize.transaction(() => {
            return Book.create({ title, description, price, discount }).then((book: Book) => {
                const authorsPromise = authors
                    ? Author.findAll({ where: { id: { [Op.in]: authors.split(',') } } })
                    : Bluebird.resolve(null);
                const genresPromise = genres
                    ? Genre.findAll({ where: { id: { [Op.in]: genres.split(',') } } })
                    : Bluebird.resolve(null);

                return Bluebird.all([authorsPromise, genresPromise])
                    .then(([authors, genres]) => {
                        const setAuthorsPromise = authors ? book.setAuthors(authors) : Bluebird.resolve(null);
                        const setGenresPromise = genres ? book.setGenres(genres) : Bluebird.resolve(null);

                        return Bluebird.all([setAuthorsPromise, setGenresPromise]);
                    })
                    .then(() => {
                        return book.reload({
                            include: [
                                {
                                    model: Author,
                                    through: { attributes: [] },
                                },
                                {
                                    model: Genre,
                                    through: { attributes: [] },
                                },
                            ],
                        });
                    });
            });
        });
    }

    /**
     * Update book in DB
     *
     * @param data
     */
    public update(data: any): Bluebird<any> {
        return Bluebird.resolve();
    }

    /**
     * Delete book from DB
     *
     * @param data
     */
    public delete(data: any): Bluebird<any> {
        return Bluebird.resolve();
    }
}

export default new BookRepository();
