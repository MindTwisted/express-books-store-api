'use strict';

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('@models/index');
const Book = db.Book;
const Author = db.Author;
const Genre = db.Genre;

module.exports = {

    /**
     * Query all books from DB
     * 
     * @param {Object} req
     */
    findAll(req) {
        const query = req.query;
        const offset = parseInt(query.offset);
        const search = query.search;
        let authors = query.authors;
        let genres = query.genres;

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
};