'use strict';

const db = require('@models/index');
const Author = db.Author;
const NotFoundError = require('@errors/NotFoundError');

module.exports = {

    /**
     * Query all authors from DB
     * 
     * @param {Object} req 
     */
    findAll(req) {
        const query = req.query;
        const offset = parseInt(query.offset);
        const offsetClause = offset ? {offset} : {};

        return Author.findAll({
                limit: 50,
                ...offsetClause
            });
    },

    /**
     * Query single author from DB
     * 
     * @param {Object} req 
     */
    findOne(req) {
        const params = req.params;
        const id = params.id;

        return Author.findOne({
                where: {id}
            })
            .then(author => {
                if (!author) {
                    return Promise.reject(new NotFoundError(`Author with id ${id} doesn't exist.`));
                }

                return Promise.resolve(author);
            });
    },

    /**
     * Store author to DB
     * 
     * @param {Object} req 
     */
    create(req) {
        const body = req.body;

        return Author.create({
                name: body.name
            });
    },

    /**
     * Update author in DB
     * 
     * @param {Object} req 
     */
    update(req) {
        const id = req.params.id;
        const body = req.body;
        const name = body.name;

        return Author.findOne({
                where: {id}
            })
            .then(author => {
                if (!author) {
                    return Promise.reject(new NotFoundError(`Author with id ${id} doesn't exist.`));
                }

                author.name = name;

                return author.save();
            });
    },

    /**
     * Delete author from DB
     * 
     * @param {Object} req 
     */
    delete(req) {
        const id = req.params.id;

        return Author.findOne({
                where: {id}
            })
            .then(author => {
                if (!author) {
                    return Promise.reject(new NotFoundError(`Author with id ${id} doesn't exist.`));
                }

                return author.destroy();
            });
    }
};