'use strict';

import Sequelize from 'sequelize';
import db from '@models/index';
import RepositoryInterface from '@interfaces/RepositoryInterface';

const Op = Sequelize.Op;
const Book = db.Book;
const Author = db.Author;
const Genre = db.Genre;

class BookRepository implements RepositoryInterface {

    /**
     * Query all books from DB
     * 
     * @param data 
     */
    findAll(data: any) {
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
     * Query single book from DB
     * 
     * @param data 
     */
    findOne(data: any) {
        return Promise.resolve();
    }

    /**
     * Store book to DB
     * 
     * @param data 
     */
    create(data: any) {
        return Promise.resolve();
    }

    /**
     * Update book in DB
     * 
     * @param data 
     */
    update(data: any) {
        return Promise.resolve();
    }

    /**
     * Delete book from DB
     * 
     * @param data 
     */
    delete(data: any) {
        return Promise.resolve();
    }
}

export default new BookRepository();