import { Op } from 'sequelize';
import Bluebird from 'bluebird';
import { Genre } from '@models/Genre';
import NotFoundError from '@errors/NotFoundError';
import RepositoryInterface from '@interfaces/RepositoryInterface';

class GenreRepository implements RepositoryInterface {
    /**
     * Query all genres from DB
     *
     * @param data
     */
    public findAll(data: any): Bluebird<any> {
        const offset = parseInt(data.offset);
        const search = data.search;
        const whereClause = search ? { where: { name: { [Op.like]: `%${search}%` } } } : {};
        const offsetClause = offset ? { offset } : {};

        return Genre.findAll({
            limit: 50,
            ...whereClause,
            ...offsetClause,
        });
    }

    /**
     * Query single genre from DB by id
     *
     * @param data
     */
    public findOneById(id: number): Bluebird<any> {
        return Genre.findOne({
            where: { id },
        }).then((genre: Genre | null) => {
            if (!genre) {
                return Bluebird.reject(new NotFoundError(`Genre with id ${id} doesn't exist.`));
            }

            return Bluebird.resolve(genre);
        });
    }

    /**
     * Query single genre from DB
     *
     * @param data
     */
    public findOne(data: any): Bluebird<any> {
        return Bluebird.resolve();
    }

    /**
     * Store genre to DB
     *
     * @param data
     */
    public create(data: any): Bluebird<any> {
        const { name } = data;

        return Genre.create({ name });
    }

    /**
     * Update genre in DB
     *
     * @param data
     */
    public update(data: any): Bluebird<any> {
        const { id, name } = data;

        return Genre.findOne({
            where: { id },
        }).then((genre: Genre | null) => {
            if (!genre) {
                return Bluebird.reject(new NotFoundError(`Genre with id ${id} doesn't exist.`));
            }

            genre.name = name;

            return genre.save();
        });
    }

    /**
     * Delete genre from DB
     *
     * @param data
     */
    public delete(data: any): Bluebird<any> {
        const { id } = data;

        return Genre.findOne({
            where: { id },
        }).then((genre: Genre | null) => {
            if (!genre) {
                return Bluebird.reject(new NotFoundError(`Genre with id ${id} doesn't exist.`));
            }

            return genre.destroy();
        });
    }
}

export default new GenreRepository();
