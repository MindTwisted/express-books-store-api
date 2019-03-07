'use strict';

const view = require('@views/index');
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
    }

};