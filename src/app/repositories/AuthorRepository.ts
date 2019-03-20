import { Op } from 'sequelize';
import Bluebird from 'bluebird';
import NotFoundError from '@errors/NotFoundError';
import RepositoryInterface from '@interfaces/RepositoryInterface';
import Author from '@models/Author';

class AuthorRepository implements RepositoryInterface {
    /**
     * Query all authors from DB
     *
     * @param data
     */
    public findAll(data: any): Bluebird<any> {
        const offset = parseInt(data.offset);
        const search = data.search;
        const whereClause = search ? { where: { name: { [Op.like]: `%${search}%` } } } : {};
        const offsetClause = offset ? { offset } : {};

        return Author.findAll({
            limit: 50,
            ...whereClause,
            ...offsetClause,
        });
    }

    /**
     * Query single author from DB by id
     *
     * @param data
     */
    public findOneById(id: number): Bluebird<any> {
        return Author.findOne({
            where: { id },
        }).then((author: Author | null) => {
            if (!author) {
                return Bluebird.reject(new NotFoundError(`Author with id ${id} doesn't exist.`));
            }

            return Bluebird.resolve(author);
        });
    }

    /**
     * Query single author from DB
     *
     * @param data
     */
    public findOne(data: any): Bluebird<any> {
        return Bluebird.resolve();
    }

    /**
     * Store author to DB
     *
     * @param data
     */
    public create(data: any): Bluebird<any> {
        const { name } = data;

        return Author.create({ name });
    }

    /**
     * Update author in DB
     *
     * @param data
     */
    public update(data: any): Bluebird<any> {
        const { id, name } = data;

        return Author.findOne({
            where: { id },
        }).then((author: Author | null) => {
            if (!author) {
                return Bluebird.reject(new NotFoundError(`Author with id ${id} doesn't exist.`));
            }

            author.name = name;

            return author.save();
        });
    }

    /**
     * Delete author from DB
     *
     * @param data
     */
    public delete(data: any): Bluebird<any> {
        const { id } = data;

        return Author.findOne({
            where: { id },
        }).then((author: Author | null) => {
            if (!author) {
                return Bluebird.reject(new NotFoundError(`Author with id ${id} doesn't exist.`));
            }

            return author.destroy();
        });
    }
}

export default new AuthorRepository();
