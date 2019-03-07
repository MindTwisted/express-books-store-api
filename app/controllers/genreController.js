'use strict';

const view = require('@views/index');
const NotFoundError = require('@errors/NotFoundError');
const db = require('@models/index');
const Genre = db.Genre;

module.exports = {

    /**
     * Get all genres
     * 
     * @param {Object} req 
     * @param {Object} res 
     * @param {Function} next 
     */
    index(req, res, next) {
        const offset = parseInt(req.query.offset) || 0;

        Genre.findAll({
                limit: 50,
                offset
            })
            .then(genres => {
                const data = {
                    genres
                };

                res.status(200).send(view.generate(null, data));
            }).catch(next);
    },

    /**
     * Get genre by id
     * 
     * @param {Object} req 
     * @param {Object} res 
     * @param {Function} next 
     */
    show(req, res, next) {
        const id = req.params.id;

        Genre.findOne({
                where: {id}
            })
            .then(genre => {
                if (!genre) {
                    return Promise.reject(new NotFoundError(`Genre with id ${id} doesn't exist.`));
                }

                const data = {
                    genre
                };

                res.status(200).send(view.generate(null, data));
            }).catch(next);
    },

    /**
     * Create new genre
     * 
     * @param {Object} req 
     * @param {Object} res 
     * @param {Function} next
     */
    store(req, res, next) {
        const body = req.body;

        Genre.create({
                name: body.name
            })
            .then(genre => {
                const text = 'Genre was successfully created.';
                const data = {
                    genre
                };

                res.status(200).send(view.generate(text, data));
            }).catch(next);
    },

    /**
     * Update genre
     * 
     * @param {Object} req 
     * @param {Object} res 
     * @param {Function} next 
     */
    update(req, res, next) {
        const id = req.params.id;
        const body = req.body;
        const name = body.name;

        Genre.findOne({
                where: {id}
            })
            .then(genre => {
                if (!genre) {
                    return Promise.reject(new NotFoundError(`Genre with id ${id} doesn't exist.`));
                }

                genre.name = name;

                return genre.save();
            })
            .then(genre => {
                const text = 'Genre was successfully updated.';
                const data = {
                    genre
                };

                res.status(200).send(view.generate(text, data));
            }).catch(next);
    },

    /**
     * Delete genre
     * 
     * @param {Object} req 
     * @param {Object} res 
     * @param {Function} next 
     */
    destroy(req, res, next) {
        const id = req.params.id;

        Genre.findOne({
                where: {id}
            })
            .then(genre => {
                if (!genre) {
                    return Promise.reject(new NotFoundError(`Genre with id ${id} doesn't exist.`));
                }

                return genre.destroy();
            })
            .then(() => {
                const text = `Genre with id ${id} was successfully deleted.`;

                res.status(200).send(view.generate(text));
            }).catch(next);
    }

};