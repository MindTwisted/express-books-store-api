'use strict';

const view = require('@views/index');
const genreRepository = require('@repositories/genreRepository');

module.exports = {

    /**
     * Get all genres
     * 
     * @param {Object} req 
     * @param {Object} res 
     * @param {Function} next 
     */
    index(req, res, next) {
        genreRepository.findAll(req)
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
        genreRepository.findOne(req)
            .then(genre => {
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
        genreRepository.create(req)
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
        genreRepository.update(req)
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
        genreRepository.delete(req)
            .then(genre => {
                const text = `Genre with id ${genre.id} was successfully deleted.`;

                res.status(200).send(view.generate(text));
            }).catch(next);
    }

};