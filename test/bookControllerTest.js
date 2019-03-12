'use strict';

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiEach = require('chai-each');
const server = require('../app');
const should = chai.should();
const spawn = require('child-process-promise').spawn;
const spawnOptions = { stdio: 'inherit' };

const AUTH_URL = '/api/auth';
const BOOKS_URL = '/api/books';

chai.use(chaiHttp);
chai.use(chaiEach);

const agent = chai.request.agent(server);

describe('booksController', () => {
    /**
     * Prepare before tests
     */
    before(done => {
        spawn('./node_modules/.bin/sequelize', ['db:create'], spawnOptions)
            .then(() => spawn('./node_modules/.bin/sequelize', ['db:migrate'], spawnOptions))
            .then(() => spawn('./node_modules/.bin/sequelize', ['db:seed:all'], spawnOptions))
            .then(() => done());
    });

    /**
     * Tear down after tests
     */
    after(done => {
        spawn('./node_modules/.bin/sequelize', ['db:drop'], spawnOptions)
            .then(() => done());
    });

    /**
     * Books index tests
     */
    describe(`GET ${BOOKS_URL}`, () => {
    
        it('should response with 200 and books limited by 50', done => {
            agent.get(BOOKS_URL)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('status').eql('success');
                    res.body.body.data.books.should.be.a('array').that.have.lengthOf(50);
                    res.body.body.data.books.should.each.have.property('id');
                    res.body.body.data.books.should.each.have.property('title');
                    res.body.body.data.books.should.each.have.property('description');
                    res.body.body.data.books.should.each.have.property('imagePath');
                    res.body.body.data.books.should.each.have.property('price');
                    res.body.body.data.books.should.each.have.property('discount');
                    res.body.body.data.books.should.each.have.property('Authors').that.each.have.property('id');
                    res.body.body.data.books.should.each.have.property('Authors').that.each.have.property('name');
                    res.body.body.data.books.should.each.have.property('Genres').that.each.have.property('id');
                    res.body.body.data.books.should.each.have.property('Genres').that.each.have.property('name');
                    res.body.body.data.books[0].should.have.property('id').eql(1);
                    
                    done();
                });
        });

        it('should response with 200 and books shifted by offset if offset is a valid integer', done => {
            agent.get(`${BOOKS_URL}?offset=100`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('status').eql('success');
                    res.body.body.data.books.should.be.a('array').that.have.lengthOf(50);
                    res.body.body.data.books.should.each.have.property('id');
                    res.body.body.data.books.should.each.have.property('title');
                    res.body.body.data.books.should.each.have.property('description');
                    res.body.body.data.books.should.each.have.property('imagePath');
                    res.body.body.data.books.should.each.have.property('price');
                    res.body.body.data.books.should.each.have.property('discount');
                    res.body.body.data.books.should.each.have.property('Authors').that.each.have.property('id');
                    res.body.body.data.books.should.each.have.property('Authors').that.each.have.property('name');
                    res.body.body.data.books.should.each.have.property('Genres').that.each.have.property('id');
                    res.body.body.data.books.should.each.have.property('Genres').that.each.have.property('name');
                    res.body.body.data.books[0].should.have.property('id').eql(101);
                    
                    done();
                });
        });

        it('should response with 200 and books shifted by offset if offset is not a valid integer', done => {
            agent.get(`${BOOKS_URL}?offset=100,2`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('status').eql('success');
                    res.body.body.data.books.should.be.a('array').that.have.lengthOf(50);
                    res.body.body.data.books.should.each.have.property('id');
                    res.body.body.data.books.should.each.have.property('title');
                    res.body.body.data.books.should.each.have.property('description');
                    res.body.body.data.books.should.each.have.property('imagePath');
                    res.body.body.data.books.should.each.have.property('price');
                    res.body.body.data.books.should.each.have.property('discount');
                    res.body.body.data.books.should.each.have.property('Authors').that.each.have.property('id');
                    res.body.body.data.books.should.each.have.property('Authors').that.each.have.property('name');
                    res.body.body.data.books.should.each.have.property('Genres').that.each.have.property('id');
                    res.body.body.data.books.should.each.have.property('Genres').that.each.have.property('name');
                    res.body.body.data.books[0].should.have.property('id').eql(101);
                    
                    done();
                });
        });

        it('should response with 200 and books shifted by offset if offset is not a valid integer', done => {
            agent.get(`${BOOKS_URL}?offset=100.2`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('status').eql('success');
                    res.body.body.data.books.should.be.a('array').that.have.lengthOf(50);
                    res.body.body.data.books.should.each.have.property('id');
                    res.body.body.data.books.should.each.have.property('title');
                    res.body.body.data.books.should.each.have.property('description');
                    res.body.body.data.books.should.each.have.property('imagePath');
                    res.body.body.data.books.should.each.have.property('price');
                    res.body.body.data.books.should.each.have.property('discount');
                    res.body.body.data.books.should.each.have.property('Authors').that.each.have.property('id');
                    res.body.body.data.books.should.each.have.property('Authors').that.each.have.property('name');
                    res.body.body.data.books.should.each.have.property('Genres').that.each.have.property('id');
                    res.body.body.data.books.should.each.have.property('Genres').that.each.have.property('name');
                    res.body.body.data.books[0].should.have.property('id').eql(101);
                    
                    done();
                });
        });

        it('should response with 200 and books not shifted by offset if offset is not a valid number', done => {
            agent.get(`${BOOKS_URL}?offset=abc`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('status').eql('success');
                    res.body.body.data.books.should.be.a('array').that.have.lengthOf(50);
                    res.body.body.data.books.should.each.have.property('id');
                    res.body.body.data.books.should.each.have.property('title');
                    res.body.body.data.books.should.each.have.property('description');
                    res.body.body.data.books.should.each.have.property('imagePath');
                    res.body.body.data.books.should.each.have.property('price');
                    res.body.body.data.books.should.each.have.property('discount');
                    res.body.body.data.books.should.each.have.property('Authors').that.each.have.property('id');
                    res.body.body.data.books.should.each.have.property('Authors').that.each.have.property('name');
                    res.body.body.data.books.should.each.have.property('Genres').that.each.have.property('id');
                    res.body.body.data.books.should.each.have.property('Genres').that.each.have.property('name');
                    res.body.body.data.books[0].should.have.property('id').eql(1);
                    
                    done();
                });
        });

        it('should response with 200 and books title filtered by search string', done => {
            const searchString = 'lorem';

            agent.get(`${BOOKS_URL}?search=${searchString}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('status').eql('success');
                    res.body.body.data.books.should.be.a('array');
                    res.body.body.data.books.should.each.have.property('id');
                    res.body.body.data.books.should.each.have.property('title').that.include(searchString);
                    res.body.body.data.books.should.each.have.property('description');
                    res.body.body.data.books.should.each.have.property('imagePath');
                    res.body.body.data.books.should.each.have.property('price');
                    res.body.body.data.books.should.each.have.property('discount');
                    res.body.body.data.books.should.each.have.property('Authors').that.each.have.property('id');
                    res.body.body.data.books.should.each.have.property('Authors').that.each.have.property('name');
                    res.body.body.data.books.should.each.have.property('Genres').that.each.have.property('id');
                    res.body.body.data.books.should.each.have.property('Genres').that.each.have.property('name');
                    
                    done();
                });
        });

        it('should response with 200 and books filtered by authors', done => {
            const authors = [1, 2, 3];

            agent.get(`${BOOKS_URL}?authors=${authors.join(',')}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('status').eql('success');
                    res.body.body.data.books.should.be.a('array');
                    res.body.body.data.books.should.each.have.property('id');
                    res.body.body.data.books.should.each.have.property('title');
                    res.body.body.data.books.should.each.have.property('description');
                    res.body.body.data.books.should.each.have.property('imagePath');
                    res.body.body.data.books.should.each.have.property('price');
                    res.body.body.data.books.should.each.have.property('discount');
                    res.body.body.data.books.should.each.have.property('Authors').that.each.have.property('id').that.oneOf(authors);
                    res.body.body.data.books.should.each.have.property('Authors').that.each.have.property('name');
                    res.body.body.data.books.should.each.have.property('Genres').that.each.have.property('id');
                    res.body.body.data.books.should.each.have.property('Genres').that.each.have.property('name');
                    
                    done();
                });
        });

        it('should response with 200 and books filtered by genres', done => {
            const genres = [1, 2, 3];

            agent.get(`${BOOKS_URL}?genres=${genres.join(',')}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('status').eql('success');
                    res.body.body.data.books.should.be.a('array');
                    res.body.body.data.books.should.each.have.property('id');
                    res.body.body.data.books.should.each.have.property('title');
                    res.body.body.data.books.should.each.have.property('description');
                    res.body.body.data.books.should.each.have.property('imagePath');
                    res.body.body.data.books.should.each.have.property('price');
                    res.body.body.data.books.should.each.have.property('discount');
                    res.body.body.data.books.should.each.have.property('Authors').that.each.have.property('id');
                    res.body.body.data.books.should.each.have.property('Authors').that.each.have.property('name');
                    res.body.body.data.books.should.each.have.property('Genres').that.each.have.property('id').that.oneOf(genres);
                    res.body.body.data.books.should.each.have.property('Genres').that.each.have.property('name');
                    
                    done();
                });
        });

    });

});