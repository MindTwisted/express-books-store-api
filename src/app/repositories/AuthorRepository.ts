'use strict';

import db from '@models/index';
import NotFoundError from '@errors/NotFoundError';
import RepositoryInterface from '@interfaces/RepositoryInterface';

const Author = db.Author;

class AuthorRepository implements RepositoryInterface {

    /**
     * Query all authors from DB
     * 
     * @param data 
     */
    findAll(data: any) {
        const offset = parseInt(data.offset);
        const offsetClause = offset ? {offset} : {};

        return Author.findAll({
                limit: 50,
                ...offsetClause
            });
    }

    /**
     * Query single author from DB
     * 
     * @param data 
     */
    findOne(data: any) {
        const {id} = data;

        return Author.findOne({
                where: {id}
            })
            .then((author: any) => {
                if (!author) {
                    return Promise.reject(new NotFoundError(`Author with id ${id} doesn't exist.`));
                }

                return Promise.resolve(author);
            });
    }

    /**
     * Store author to DB
     * 
     * @param data 
     */
    create(data: any) {
        const {name} = data;

        return Author.create({
                name
            });
    }

    /**
     * Update author in DB
     * 
     * @param data 
     */
    update(data: any) {
        const {id, name} = data;

        return Author.findOne({
                where: {id}
            })
            .then((author: any) => {
                if (!author) {
                    return Promise.reject(new NotFoundError(`Author with id ${id} doesn't exist.`));
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
    delete(data: any) {
        const {id} = data;

        return Author.findOne({
                where: {id}
            })
            .then((author: any) => {
                if (!author) {
                    return Promise.reject(new NotFoundError(`Author with id ${id} doesn't exist.`));
                }

                return author.destroy();
            });
    }
}

export default new AuthorRepository();