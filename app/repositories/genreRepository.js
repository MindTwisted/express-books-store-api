'use strict';

const db = require('@models/index');
const Genre = db.Genre;
const NotFoundError = require('@errors/NotFoundError');

module.exports = {

    /**
     * Query all genres from DB
     * 
     * @param {Object} req 
     */
    findAll(req) {
        const query = req.query;
        const offset = parseInt(query.offset);
        const offsetClause = offset ? {offset} : {};

        return Genre.findAll({
                limit: 50,
                ...offsetClause
            });
    },

    /**
     * Query single genre from DB
     * 
     * @param {Object} req 
     */
    findOne(req) {
        const params = req.params;
        const id = params.id;

        return Genre.findOne({
                where: {id}
            })
            .then(genre => {
                if (!genre) {
                    return Promise.reject(new NotFoundError(`Genre with id ${id} doesn't exist.`));
                }

                return Promise.resolve(genre);
            });
    },

    /**
     * Store genre to DB
     * 
     * @param {Object} req 
     */
    create(req) {
        const body = req.body;

        return Genre.create({
                name: body.name
            });
    },

    /**
     * Update genre in DB
     * 
     * @param {Object} req 
     */
    update(req) {
        const id = req.params.id;
        const body = req.body;
        const name = body.name;

        return Genre.findOne({
                where: {id}
            })
            .then(genre => {
                if (!genre) {
                    return Promise.reject(new NotFoundError(`Genre with id ${id} doesn't exist.`));
                }

                genre.name = name;

                return genre.save();
            });
    },

    /**
     * Delete genre from DB
     * 
     * @param {Object} req 
     */
    delete(req) {
        const id = req.params.id;

        return Genre.findOne({
                where: {id}
            })
            .then(genre => {
                if (!genre) {
                    return Promise.reject(new NotFoundError(`Genre with id ${id} doesn't exist.`));
                }

                return genre.destroy();
            });
    }
};