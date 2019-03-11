'use strict';

const view = require('@views/index');
const bookRepository = require('@repositories/bookRepository');

module.exports = {

    /**
     * Get all books
     * 
     * @param {Object} req 
     * @param {Object} res 
     * @param {Function} next 
     */
    index(req, res, next) {
        bookRepository.findAll(req)
            .then(books => {
                const data = {
                    books
                };

                res.status(200).send(view.generate(null, data));
            }).catch(next);
    }

};