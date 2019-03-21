import { Op } from 'sequelize';
import Bluebird from 'bluebird';
import Book from '@models/Book';
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
        const { title, description, price, discount } = data;

        return Book.create({ title, description, price, discount });
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
