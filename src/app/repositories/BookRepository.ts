import {Op} from 'sequelize';
import Bluebird from 'bluebird';
import {Author} from '@models/Author';
import {Genre} from '@models/Genre';
import {Book} from '@models/Book';
import RepositoryInterface from '@interfaces/RepositoryInterface';

class BookRepository implements RepositoryInterface {

    /**
     * Query all books from DB
     * 
     * @param data 
     */
    findAll(data: any): Bluebird<any> {
        const offset = parseInt(data.offset);
        const search = data.search;
        let authors = data.authors;
        let genres = data.genres;

        if (authors) {
            authors = Array.isArray(authors) ? authors.join(',').split(',') : authors.split(',');
        }

        if (genres) {
            genres = Array.isArray(genres) ? genres.join(',').split(',') : genres.split(',');
        }

        const authorsWhereClause = authors ? {where: {id: {[Op.in]: authors}}} : {};
        const genresWhereClause = genres ? {where: {id: {[Op.in]: genres}}} : {};
        const whereClause = search ? {where: {title: {[Op.like]: `%${search}%`}}} : {};
        const offsetClause = offset ? {offset} : {};

        return Book.findAll({
                include: [
                    {
                        model: Author,
                        through: {attributes: []},
                        ...authorsWhereClause
                    },
                    {
                        model: Genre,
                        through: {attributes: []},
                        ...genresWhereClause
                    }
                ],
                ...whereClause,
                limit: 50,
                ...offsetClause
            });
    }

    /**
     * Query single book from DB by id
     * 
     * @param data 
     */
    findOneById(id: number): Bluebird<any> {
        return Bluebird.resolve();
    }

    /**
     * Query single book from DB
     * 
     * @param data 
     */
    findOne(data: any): Bluebird<any> {
        return Bluebird.resolve();
    }

    /**
     * Store book to DB
     * 
     * @param data 
     */
    create(data: any): Bluebird<any> {
        return Bluebird.resolve();
    }

    /**
     * Update book in DB
     * 
     * @param data 
     */
    update(data: any): Bluebird<any> {
        return Bluebird.resolve();
    }

    /**
     * Delete book from DB
     * 
     * @param data 
     */
    delete(data: any): Bluebird<any> {
        return Bluebird.resolve();
    }
}

export default new BookRepository();