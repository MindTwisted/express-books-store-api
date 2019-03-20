import './init';

process.env.NODE_ENV = 'test';

import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiEach from 'chai-each';
import server from '../app';

const should = chai.should();

const AUTH_URL = '/api/auth';
const BOOKS_URL = '/api/books';

chai.use(chaiHttp);
chai.use(chaiEach);

const agent = chai.request.agent(server);

describe('booksController', () => {
    /**
     * Books index tests
     */
    describe(`GET ${BOOKS_URL}`, () => {
        it('should response with 200 and books limited by 50', async () => {
            const res = await agent.get(BOOKS_URL);

            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.body.data.books.should.be.a('array').that.have.lengthOf(50);
            res.body.body.data.books.should.each.have.property('id');
            res.body.body.data.books.should.each.have.property('title');
            res.body.body.data.books.should.each.have.property('description');
            res.body.body.data.books.should.each.have.property('imagePath');
            res.body.body.data.books.should.each.have.property('price');
            res.body.body.data.books.should.each.have.property('discount');
            res.body.body.data.books.should.each.have.property('authors').that.each.have.property('id');
            res.body.body.data.books.should.each.have.property('authors').that.each.have.property('name');
            res.body.body.data.books.should.each.have.property('genres').that.each.have.property('id');
            res.body.body.data.books.should.each.have.property('genres').that.each.have.property('name');
            res.body.body.data.books[0].should.have.property('id').eql(1);
        });

        it('should response with 200 and books shifted by offset if offset is a valid integer', async () => {
            const res = await agent.get(`${BOOKS_URL}?offset=100`);

            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.body.data.books.should.be.a('array').that.have.lengthOf(50);
            res.body.body.data.books.should.each.have.property('id');
            res.body.body.data.books.should.each.have.property('title');
            res.body.body.data.books.should.each.have.property('description');
            res.body.body.data.books.should.each.have.property('imagePath');
            res.body.body.data.books.should.each.have.property('price');
            res.body.body.data.books.should.each.have.property('discount');
            res.body.body.data.books.should.each.have.property('authors').that.each.have.property('id');
            res.body.body.data.books.should.each.have.property('authors').that.each.have.property('name');
            res.body.body.data.books.should.each.have.property('genres').that.each.have.property('id');
            res.body.body.data.books.should.each.have.property('genres').that.each.have.property('name');
            res.body.body.data.books[0].should.have.property('id').eql(101);
        });

        it('should response with 200 and books shifted by offset if offset is not a valid integer', async () => {
            const res = await agent.get(`${BOOKS_URL}?offset=100,2`);

            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.body.data.books.should.be.a('array').that.have.lengthOf(50);
            res.body.body.data.books.should.each.have.property('id');
            res.body.body.data.books.should.each.have.property('title');
            res.body.body.data.books.should.each.have.property('description');
            res.body.body.data.books.should.each.have.property('imagePath');
            res.body.body.data.books.should.each.have.property('price');
            res.body.body.data.books.should.each.have.property('discount');
            res.body.body.data.books.should.each.have.property('authors').that.each.have.property('id');
            res.body.body.data.books.should.each.have.property('authors').that.each.have.property('name');
            res.body.body.data.books.should.each.have.property('genres').that.each.have.property('id');
            res.body.body.data.books.should.each.have.property('genres').that.each.have.property('name');
            res.body.body.data.books[0].should.have.property('id').eql(101);
        });

        it('should response with 200 and books shifted by offset if offset is not a valid integer', async () => {
            const res = await agent.get(`${BOOKS_URL}?offset=100.2`);

            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.body.data.books.should.be.a('array').that.have.lengthOf(50);
            res.body.body.data.books.should.each.have.property('id');
            res.body.body.data.books.should.each.have.property('title');
            res.body.body.data.books.should.each.have.property('description');
            res.body.body.data.books.should.each.have.property('imagePath');
            res.body.body.data.books.should.each.have.property('price');
            res.body.body.data.books.should.each.have.property('discount');
            res.body.body.data.books.should.each.have.property('authors').that.each.have.property('id');
            res.body.body.data.books.should.each.have.property('authors').that.each.have.property('name');
            res.body.body.data.books.should.each.have.property('genres').that.each.have.property('id');
            res.body.body.data.books.should.each.have.property('genres').that.each.have.property('name');
            res.body.body.data.books[0].should.have.property('id').eql(101);
        });

        it('should response with 200 and books not shifted by offset if offset is not a valid number', async () => {
            const res = await agent.get(`${BOOKS_URL}?offset=abc`);

            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.body.data.books.should.be.a('array').that.have.lengthOf(50);
            res.body.body.data.books.should.each.have.property('id');
            res.body.body.data.books.should.each.have.property('title');
            res.body.body.data.books.should.each.have.property('description');
            res.body.body.data.books.should.each.have.property('imagePath');
            res.body.body.data.books.should.each.have.property('price');
            res.body.body.data.books.should.each.have.property('discount');
            res.body.body.data.books.should.each.have.property('authors').that.each.have.property('id');
            res.body.body.data.books.should.each.have.property('authors').that.each.have.property('name');
            res.body.body.data.books.should.each.have.property('genres').that.each.have.property('id');
            res.body.body.data.books.should.each.have.property('genres').that.each.have.property('name');
            res.body.body.data.books[0].should.have.property('id').eql(1);
        });

        it('should response with 200 and books filtered by search string', async () => {
            const searchString = 'Book for testing';
            const res = await agent.get(`${BOOKS_URL}?search=${searchString}`);

            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.body.data.books.should.be.a('array');
            res.body.body.data.books.should.be.a('array').that.have.lengthOf(10);
            res.body.body.data.books.should.each.have.property('id');
            res.body.body.data.books.should.each.have.property('title').that.include(searchString);
            res.body.body.data.books.should.each.have.property('description');
            res.body.body.data.books.should.each.have.property('imagePath');
            res.body.body.data.books.should.each.have.property('price');
            res.body.body.data.books.should.each.have.property('discount');
            res.body.body.data.books.should.each.have.property('authors').that.each.have.property('id');
            res.body.body.data.books.should.each.have.property('authors').that.each.have.property('name');
            res.body.body.data.books.should.each.have.property('genres').that.each.have.property('id');
            res.body.body.data.books.should.each.have.property('genres').that.each.have.property('name');
        });

        it('should response with 200 and books filtered by search string', async () => {
            const searchString = 'Book for testing 1';
            const res = await agent.get(`${BOOKS_URL}?search=${searchString}`);

            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.body.data.books.should.be.a('array');
            res.body.body.data.books.should.be.a('array').that.have.lengthOf(1);
            res.body.body.data.books.should.each.have.property('id');
            res.body.body.data.books.should.each.have.property('title').that.include(searchString);
            res.body.body.data.books.should.each.have.property('description');
            res.body.body.data.books.should.each.have.property('imagePath');
            res.body.body.data.books.should.each.have.property('price');
            res.body.body.data.books.should.each.have.property('discount');
            res.body.body.data.books.should.each.have.property('authors').that.each.have.property('id');
            res.body.body.data.books.should.each.have.property('authors').that.each.have.property('name');
            res.body.body.data.books.should.each.have.property('genres').that.each.have.property('id');
            res.body.body.data.books.should.each.have.property('genres').that.each.have.property('name');
        });

        it('should response with 200 and books filtered by authors', async () => {
            const authors = [1, 2, 3];
            const res = await agent.get(`${BOOKS_URL}?authors=${authors.join(',')}`);

            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.body.data.books.should.be.a('array');
            res.body.body.data.books.should.each.have.property('id');
            res.body.body.data.books.should.each.have.property('title');
            res.body.body.data.books.should.each.have.property('description');
            res.body.body.data.books.should.each.have.property('imagePath');
            res.body.body.data.books.should.each.have.property('price');
            res.body.body.data.books.should.each.have.property('discount');
            res.body.body.data.books.should.each.have
                .property('authors')
                .that.each.have.property('id')
                .that.oneOf(authors);
            res.body.body.data.books.should.each.have.property('authors').that.each.have.property('name');
            res.body.body.data.books.should.each.have.property('genres').that.each.have.property('id');
            res.body.body.data.books.should.each.have.property('genres').that.each.have.property('name');
        });

        it('should response with 200 and books filtered by genres', async () => {
            const genres = [1, 2, 3];
            const res = await agent.get(`${BOOKS_URL}?genres=${genres.join(',')}`);

            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.body.data.books.should.be.a('array');
            res.body.body.data.books.should.each.have.property('id');
            res.body.body.data.books.should.each.have.property('title');
            res.body.body.data.books.should.each.have.property('description');
            res.body.body.data.books.should.each.have.property('imagePath');
            res.body.body.data.books.should.each.have.property('price');
            res.body.body.data.books.should.each.have.property('discount');
            res.body.body.data.books.should.each.have.property('authors').that.each.have.property('id');
            res.body.body.data.books.should.each.have.property('authors').that.each.have.property('name');
            res.body.body.data.books.should.each.have
                .property('genres')
                .that.each.have.property('id')
                .that.oneOf(genres);
            res.body.body.data.books.should.each.have.property('genres').that.each.have.property('name');
        });
    });
});
