'use strict';

const view = require('@views/index');
const authorRepository = require('@repositories/authorRepository');

module.exports = {

    /**
     * Get all authors
     * 
     * @param {Object} req 
     * @param {Object} res 
     * @param {Function} next 
     */
    index(req, res, next) {
        authorRepository.findAll(req)
            .then(authors => {
                const data = {
                    authors
                };

                res.status(200).send(view.generate(null, data));
            }).catch(next);
    },

    /**
     * Get author by id
     * 
     * @param {Object} req 
     * @param {Object} res 
     * @param {Function} next 
     */
    show(req, res, next) {
        authorRepository.findOne(req)
            .then(author => {
                const data = {
                    author
                };

                res.status(200).send(view.generate(null, data));
            }).catch(next);
    },

    /**
     * Create new author
     * 
     * @param {Object} req 
     * @param {Object} res 
     * @param {Function} next
     */
    store(req, res, next) {
        authorRepository.create(req)
            .then(author => {
                const text = 'Author was successfully created.';
                const data = {
                    author
                };

                res.status(200).send(view.generate(text, data));
            }).catch(next);
    },

    /**
     * Update author
     * 
     * @param {Object} req 
     * @param {Object} res 
     * @param {Function} next 
     */
    update(req, res, next) {
        authorRepository.update(req)
            .then(author => {
                const text = 'Author was successfully updated.';
                const data = {
                    author
                };

                res.status(200).send(view.generate(text, data));
            }).catch(next);
    },

    /**
     * Delete author
     * 
     * @param {Object} req 
     * @param {Object} res 
     * @param {Function} next 
     */
    destroy(req, res, next) {
        authorRepository.delete(req)
            .then(author => {
                const text = `Author with id ${author.id} was successfully deleted.`;

                res.status(200).send(view.generate(text));
            }).catch(next);
    }

};