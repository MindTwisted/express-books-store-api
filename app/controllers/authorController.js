'use strict';

const view = require('@views/index');
const NotFoundError = require('@errors/NotFoundError');
const db = require('@models/index');
const Author = db.Author;

module.exports = {

    /**
     * Get all authors
     * 
     * @param {Object} req 
     * @param {Object} res 
     * @param {Function} next 
     */
    index(req, res, next) {
        const offset = parseInt(req.query.offset) || 0;

        Author.findAll({
                limit: 50,
                offset
            })
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
        const id = req.params.id;

        Author.findOne({
                where: {id}
            })
            .then(author => {
                if (!author) {
                    return next(new NotFoundError(`Author with id ${id} doesn't exist.`));
                }

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
        const body = req.body;

        Author.create({
                name: body.name
            })
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
        const id = req.params.id;
        const body = req.body;
        const name = body.name;

        Author.findOne({
                where: {id}
            })
            .then(author => {
                if (!author) {
                    return next(new NotFoundError(`Author with id ${id} doesn't exist.`));
                }

                author.name = name;

                return author.save();
            })
            .then(author => {
                const text = 'Author was successfully updated.';
                const data = {
                    author
                };

                res.status(200).send(view.generate(text, data));
            }).catch(next);
    }

};