import db from '@models/index';
import NotFoundError from '@errors/NotFoundError';
import RepositoryInterface from '@interfaces/RepositoryInterface';

const Genre = db.Genre;

class GenreRepository implements RepositoryInterface {

    /**
     * Query all genres from DB
     * 
     * @param data 
     */
    findAll(data: any) {
        const offset = parseInt(data.offset);
        const offsetClause = offset ? {offset} : {};

        return Genre.findAll({
                limit: 50,
                ...offsetClause
            });
    }

    /**
     * Query single genre from DB
     * 
     * @param data 
     */
    findOne(data: any) {
        const {id} = data;

        return Genre.findOne({
                where: {id}
            })
            .then((genre: any) => {
                if (!genre) {
                    return Promise.reject(new NotFoundError(`Genre with id ${id} doesn't exist.`));
                }

                return Promise.resolve(genre);
            });
    }

    /**
     * Store genre to DB
     * 
     * @param data 
     */
    create(data: any) {
        const {name} = data;

        return Genre.create({
                name
            });
    }

    /**
     * Update genre in DB
     * 
     * @param data 
     */
    update(data: any) {
        const {id, name} = data;

        return Genre.findOne({
                where: {id}
            })
            .then((genre: any) => {
                if (!genre) {
                    return Promise.reject(new NotFoundError(`Genre with id ${id} doesn't exist.`));
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
    delete(data: any) {
        const {id} = data;

        return Genre.findOne({
                where: {id}
            })
            .then((genre: any) => {
                if (!genre) {
                    return Promise.reject(new NotFoundError(`Genre with id ${id} doesn't exist.`));
                }

                return genre.destroy();
            });
    }
}

export default new GenreRepository();