import './init';

process.env.NODE_ENV = 'test';

import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiEach from 'chai-each';
import server from '../app';
import { countIntegersInArray } from './utils';

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

    /**
     * Books show tests
     */
    describe(`GET ${BOOKS_URL}/:id`, () => {
        it('should response with 200 and book if book with provided id exists', async () => {
            const bookId = 1;
            const res = await agent.get(`${BOOKS_URL}/${bookId}`);

            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.body.data.should.have.property('book');
            res.body.body.data.book.should.have.property('id').eql(bookId);
            res.body.body.data.book.should.have.property('title');
            res.body.body.data.book.should.have.property('description');
            res.body.body.data.book.should.have.property('imagePath');
            res.body.body.data.book.should.have.property('price');
            res.body.body.data.book.should.have.property('discount');
            res.body.body.data.book.should.have.property('authors').that.each.have.property('id');
            res.body.body.data.book.should.have.property('authors').that.each.have.property('name');
            res.body.body.data.book.should.have.property('genres').that.each.have.property('id');
            res.body.body.data.book.should.have.property('genres').that.each.have.property('name');
        });

        it('should response with 404 if book with provided id does not exist', async () => {
            const bookId = 99999;
            const res = await agent.get(`${BOOKS_URL}/${bookId}`);

            res.should.have.status(404);
            res.body.should.have.property('status').eql('failed');
        });

        it('should response with 404 if author with provided id does not exist', async () => {
            const bookId = 'abc';
            const res = await agent.get(`${BOOKS_URL}/${bookId}`);

            res.should.have.status(404);
            res.body.should.have.property('status').eql('failed');
        });
    });

    /**
     * Books store tests
     */
    describe(`POST ${BOOKS_URL}`, () => {
        it('should response with 401 if auth token was not provided', async () => {
            const res = await agent.post(BOOKS_URL);

            res.should.have.status(401);
            res.body.should.have.property('status').eql('failed');
        });

        it('should response with 403 if auth token was not owned by admin', async () => {
            const token = (await agent.put(AUTH_URL).send({
                email: 'smith@example.com',
                password: 'secret',
            })).body.body.data.token;
            const res = await agent.post(BOOKS_URL).set('Authorization', `Bearer ${token}`);

            res.should.have.status(403);
            res.body.should.have.property('status').eql('failed');
        });

        it('should response with 422 if book title, description and price were not provided', async () => {
            const token = (await agent.put(AUTH_URL).send({
                email: 'john@example.com',
                password: 'secret',
            })).body.body.data.token;
            const res = await agent.post(BOOKS_URL).set('Authorization', `Bearer ${token}`);

            res.should.have.status(422);
            res.body.should.have.property('status').eql('failed');
            res.body.body.data.errors.should.have.property('title');
            res.body.body.data.errors.should.have.property('description');
            res.body.body.data.errors.should.have.property('price');
        });

        it('should response with 422 if book title was less than 6 characters', async () => {
            const BOOK_TITLE = 'a'.repeat(5);
            const BOOK_DESCRIPTION = 'a'.repeat(20);
            const BOOK_PRICE = 10;

            const token = (await agent.put(AUTH_URL).send({
                email: 'john@example.com',
                password: 'secret',
            })).body.body.data.token;
            const res = await agent
                .post(BOOKS_URL)
                .send({
                    title: BOOK_TITLE,
                    description: BOOK_DESCRIPTION,
                    price: BOOK_PRICE,
                })
                .set('Authorization', `Bearer ${token}`);

            res.should.have.status(422);
            res.body.should.have.property('status').eql('failed');
            res.body.body.data.errors.should.have.property('title');
        });

        it('should response with 422 if book title has already existed', async () => {
            const BOOK_TITLE = 'New Book';
            const BOOK_DESCRIPTION = 'a'.repeat(20);
            const BOOK_PRICE = 10;

            const token = (await agent.put(AUTH_URL).send({
                email: 'john@example.com',
                password: 'secret',
            })).body.body.data.token;

            await agent
                .post(BOOKS_URL)
                .send({
                    title: BOOK_TITLE,
                    description: BOOK_DESCRIPTION,
                    price: BOOK_PRICE,
                })
                .set('Authorization', `Bearer ${token}`);

            const res = await agent
                .post(BOOKS_URL)
                .send({
                    title: BOOK_TITLE,
                    description: BOOK_DESCRIPTION,
                    price: BOOK_PRICE,
                })
                .set('Authorization', `Bearer ${token}`);

            res.should.have.status(422);
            res.body.should.have.property('status').eql('failed');
            res.body.body.data.errors.should.have.property('title');
        });

        it('should response with 422 if book description was less than 20 characters', async () => {
            const BOOK_TITLE = 'a'.repeat(6);
            const BOOK_DESCRIPTION = 'a'.repeat(19);
            const BOOK_PRICE = 10;

            const token = (await agent.put(AUTH_URL).send({
                email: 'john@example.com',
                password: 'secret',
            })).body.body.data.token;
            const res = await agent
                .post(BOOKS_URL)
                .send({
                    title: BOOK_TITLE,
                    description: BOOK_DESCRIPTION,
                    price: BOOK_PRICE,
                })
                .set('Authorization', `Bearer ${token}`);

            res.should.have.status(422);
            res.body.should.have.property('status').eql('failed');
            res.body.body.data.errors.should.have.property('description');
        });

        it('should response with 422 if book price was less than 0', async () => {
            const BOOK_TITLE = 'a'.repeat(6);
            const BOOK_DESCRIPTION = 'a'.repeat(20);
            const BOOK_PRICE = -1;

            const token = (await agent.put(AUTH_URL).send({
                email: 'john@example.com',
                password: 'secret',
            })).body.body.data.token;
            const res = await agent
                .post(BOOKS_URL)
                .send({
                    title: BOOK_TITLE,
                    description: BOOK_DESCRIPTION,
                    price: BOOK_PRICE,
                })
                .set('Authorization', `Bearer ${token}`);

            res.should.have.status(422);
            res.body.should.have.property('status').eql('failed');
            res.body.body.data.errors.should.have.property('price');
        });

        it('should response with 422 if book price was not numeric', async () => {
            const BOOK_TITLE = 'a'.repeat(6);
            const BOOK_DESCRIPTION = 'a'.repeat(20);
            const BOOK_PRICE = 'abc';

            const token = (await agent.put(AUTH_URL).send({
                email: 'john@example.com',
                password: 'secret',
            })).body.body.data.token;
            const res = await agent
                .post(BOOKS_URL)
                .send({
                    title: BOOK_TITLE,
                    description: BOOK_DESCRIPTION,
                    price: BOOK_PRICE,
                })
                .set('Authorization', `Bearer ${token}`);

            res.should.have.status(422);
            res.body.should.have.property('status').eql('failed');
            res.body.body.data.errors.should.have.property('price');
        });

        it('should response with 422 if book price was not numeric', async () => {
            const BOOK_TITLE = 'a'.repeat(6);
            const BOOK_DESCRIPTION = 'a'.repeat(20);
            const BOOK_PRICE = '50,5';

            const token = (await agent.put(AUTH_URL).send({
                email: 'john@example.com',
                password: 'secret',
            })).body.body.data.token;
            const res = await agent
                .post(BOOKS_URL)
                .send({
                    title: BOOK_TITLE,
                    description: BOOK_DESCRIPTION,
                    price: BOOK_PRICE,
                })
                .set('Authorization', `Bearer ${token}`);

            res.should.have.status(422);
            res.body.should.have.property('status').eql('failed');
            res.body.body.data.errors.should.have.property('price');
        });

        it('should response with 422 if book discount was less than 0', async () => {
            const BOOK_TITLE = 'a'.repeat(6);
            const BOOK_DESCRIPTION = 'a'.repeat(20);
            const BOOK_PRICE = 10;
            const BOOK_DISCOUNT = -1;

            const token = (await agent.put(AUTH_URL).send({
                email: 'john@example.com',
                password: 'secret',
            })).body.body.data.token;
            const res = await agent
                .post(BOOKS_URL)
                .send({
                    title: BOOK_TITLE,
                    description: BOOK_DESCRIPTION,
                    price: BOOK_PRICE,
                    discount: BOOK_DISCOUNT,
                })
                .set('Authorization', `Bearer ${token}`);

            res.should.have.status(422);
            res.body.should.have.property('status').eql('failed');
            res.body.body.data.errors.should.have.property('discount');
        });

        it('should response with 422 if book discount was greater than 50', async () => {
            const BOOK_TITLE = 'a'.repeat(6);
            const BOOK_DESCRIPTION = 'a'.repeat(20);
            const BOOK_PRICE = 10;
            const BOOK_DISCOUNT = 51;

            const token = (await agent.put(AUTH_URL).send({
                email: 'john@example.com',
                password: 'secret',
            })).body.body.data.token;
            const res = await agent
                .post(BOOKS_URL)
                .send({
                    title: BOOK_TITLE,
                    description: BOOK_DESCRIPTION,
                    price: BOOK_PRICE,
                    discount: BOOK_DISCOUNT,
                })
                .set('Authorization', `Bearer ${token}`);

            res.should.have.status(422);
            res.body.should.have.property('status').eql('failed');
            res.body.body.data.errors.should.have.property('discount');
        });

        it('should response with 422 if book discount was not numeric', async () => {
            const BOOK_TITLE = 'a'.repeat(6);
            const BOOK_DESCRIPTION = 'a'.repeat(20);
            const BOOK_PRICE = 10;
            const BOOK_DISCOUNT = 'abc';

            const token = (await agent.put(AUTH_URL).send({
                email: 'john@example.com',
                password: 'secret',
            })).body.body.data.token;
            const res = await agent
                .post(BOOKS_URL)
                .send({
                    title: BOOK_TITLE,
                    description: BOOK_DESCRIPTION,
                    price: BOOK_PRICE,
                    discount: BOOK_DISCOUNT,
                })
                .set('Authorization', `Bearer ${token}`);

            res.should.have.status(422);
            res.body.should.have.property('status').eql('failed');
            res.body.body.data.errors.should.have.property('discount');
        });

        it('should response with 422 if book discount was not numeric', async () => {
            const BOOK_TITLE = 'a'.repeat(6);
            const BOOK_DESCRIPTION = 'a'.repeat(20);
            const BOOK_PRICE = 10;
            const BOOK_DISCOUNT = '10,5';

            const token = (await agent.put(AUTH_URL).send({
                email: 'john@example.com',
                password: 'secret',
            })).body.body.data.token;
            const res = await agent
                .post(BOOKS_URL)
                .send({
                    title: BOOK_TITLE,
                    description: BOOK_DESCRIPTION,
                    price: BOOK_PRICE,
                    discount: BOOK_DISCOUNT,
                })
                .set('Authorization', `Bearer ${token}`);

            res.should.have.status(422);
            res.body.should.have.property('status').eql('failed');
            res.body.body.data.errors.should.have.property('discount');
        });

        it('should response with 200 and book if valid data were provided', async () => {
            const BOOK_TITLE = 'a'.repeat(6);
            const BOOK_DESCRIPTION = 'a'.repeat(20);
            const BOOK_PRICE = 10;
            const BOOK_DISCOUNT = 10;

            const token = (await agent.put(AUTH_URL).send({
                email: 'john@example.com',
                password: 'secret',
            })).body.body.data.token;
            const res = await agent
                .post(BOOKS_URL)
                .send({
                    title: BOOK_TITLE,
                    description: BOOK_DESCRIPTION,
                    price: BOOK_PRICE,
                    discount: BOOK_DISCOUNT,
                })
                .set('Authorization', `Bearer ${token}`);

            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.body.data.should.have.property('book');
            res.body.body.data.book.should.have.property('id');
            res.body.body.data.book.should.have.property('title');
            res.body.body.data.book.should.have.property('description');
            res.body.body.data.book.should.have.property('imagePath');
            res.body.body.data.book.should.have.property('price');
            res.body.body.data.book.should.have.property('discount');
            res.body.body.data.book.should.have.property('authors');
            res.body.body.data.book.should.have.property('genres');
            res.body.body.data.book.authors.should.be.a('array').that.have.lengthOf(0);
            res.body.body.data.book.genres.should.be.a('array').that.have.lengthOf(0);
        });

        it('should response with 200 and book with authors and genres if valid data were provided', async () => {
            const BOOK_TITLE = 'a'.repeat(6) + +Date.now();
            const BOOK_DESCRIPTION = 'a'.repeat(20);
            const BOOK_PRICE = 10;
            const BOOK_DISCOUNT = 10;
            const BOOK_AUTHORS: any[] = [51, 52, 53];
            const BOOK_GENRES: any[] = [54, 55];

            const authorsIntegerCount = countIntegersInArray(BOOK_AUTHORS);
            const genresIntegerCount = countIntegersInArray(BOOK_GENRES);

            const token = (await agent.put(AUTH_URL).send({
                email: 'john@example.com',
                password: 'secret',
            })).body.body.data.token;
            const res = await agent
                .post(BOOKS_URL)
                .send({
                    title: BOOK_TITLE,
                    description: BOOK_DESCRIPTION,
                    price: BOOK_PRICE,
                    discount: BOOK_DISCOUNT,
                    authors: BOOK_AUTHORS.join(','),
                    genres: BOOK_GENRES.join(','),
                })
                .set('Authorization', `Bearer ${token}`);

            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.body.data.should.have.property('book');
            res.body.body.data.book.should.have.property('title');
            res.body.body.data.book.should.have.property('description');
            res.body.body.data.book.should.have.property('imagePath');
            res.body.body.data.book.should.have.property('price');
            res.body.body.data.book.should.have.property('discount');
            res.body.body.data.book.should.have
                .property('authors')
                .that.each.have.property('id')
                .that.oneOf(BOOK_AUTHORS);
            res.body.body.data.book.should.have.property('authors').that.each.have.property('name');
            res.body.body.data.book.should.have
                .property('genres')
                .that.each.have.property('id')
                .that.oneOf(BOOK_GENRES);
            res.body.body.data.book.should.have.property('genres').that.each.have.property('name');
            res.body.body.data.book.authors.should.be.a('array').that.have.lengthOf(authorsIntegerCount);
            res.body.body.data.book.genres.should.be.a('array').that.have.lengthOf(genresIntegerCount);
        });

        it('should response with 200 and book with authors and genres if valid data were provided', async () => {
            const BOOK_TITLE = 'a'.repeat(6) + +Date.now();
            const BOOK_DESCRIPTION = 'a'.repeat(20);
            const BOOK_PRICE = 10;
            const BOOK_DISCOUNT = 10;
            const BOOK_AUTHORS: any[] = [51, 52, 53, 'abc', true];
            const BOOK_GENRES: any[] = ['abc', false, 55];

            const authorsIntegerCount = countIntegersInArray(BOOK_AUTHORS);
            const genresIntegerCount = countIntegersInArray(BOOK_GENRES);

            const token = (await agent.put(AUTH_URL).send({
                email: 'john@example.com',
                password: 'secret',
            })).body.body.data.token;
            const res = await agent
                .post(BOOKS_URL)
                .send({
                    title: BOOK_TITLE,
                    description: BOOK_DESCRIPTION,
                    price: BOOK_PRICE,
                    discount: BOOK_DISCOUNT,
                    authors: BOOK_AUTHORS.join(','),
                    genres: BOOK_GENRES.join(','),
                })
                .set('Authorization', `Bearer ${token}`);

            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.body.data.should.have.property('book');
            res.body.body.data.book.should.have.property('title');
            res.body.body.data.book.should.have.property('description');
            res.body.body.data.book.should.have.property('imagePath');
            res.body.body.data.book.should.have.property('price');
            res.body.body.data.book.should.have.property('discount');
            res.body.body.data.book.should.have
                .property('authors')
                .that.each.have.property('id')
                .that.oneOf(BOOK_AUTHORS);
            res.body.body.data.book.should.have.property('authors').that.each.have.property('name');
            res.body.body.data.book.should.have
                .property('genres')
                .that.each.have.property('id')
                .that.oneOf(BOOK_GENRES);
            res.body.body.data.book.should.have.property('genres').that.each.have.property('name');
            res.body.body.data.book.authors.should.be.a('array').that.have.lengthOf(authorsIntegerCount);
            res.body.body.data.book.genres.should.be.a('array').that.have.lengthOf(genresIntegerCount);
        });

        it('should response with 200 and book with authors and genres if valid data were provided', async () => {
            const BOOK_TITLE = 'a'.repeat(6) + +Date.now();
            const BOOK_DESCRIPTION = 'a'.repeat(20);
            const BOOK_PRICE = 10;
            const BOOK_DISCOUNT = 10;
            const BOOK_AUTHORS: any[] = [];
            const BOOK_GENRES: any[] = [];

            const authorsIntegerCount = countIntegersInArray(BOOK_AUTHORS);
            const genresIntegerCount = countIntegersInArray(BOOK_GENRES);

            const token = (await agent.put(AUTH_URL).send({
                email: 'john@example.com',
                password: 'secret',
            })).body.body.data.token;
            const res = await agent
                .post(BOOKS_URL)
                .send({
                    title: BOOK_TITLE,
                    description: BOOK_DESCRIPTION,
                    price: BOOK_PRICE,
                    discount: BOOK_DISCOUNT,
                    authors: BOOK_AUTHORS.join(','),
                    genres: BOOK_GENRES.join(','),
                })
                .set('Authorization', `Bearer ${token}`);

            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.body.data.should.have.property('book');
            res.body.body.data.book.should.have.property('title');
            res.body.body.data.book.should.have.property('description');
            res.body.body.data.book.should.have.property('imagePath');
            res.body.body.data.book.should.have.property('price');
            res.body.body.data.book.should.have.property('discount');
            res.body.body.data.book.should.have.property('authors').that.each.have.property('id');
            res.body.body.data.book.should.have.property('authors').that.each.have.property('name');
            res.body.body.data.book.should.have.property('genres').that.each.have.property('id');
            res.body.body.data.book.should.have.property('genres').that.each.have.property('name');
            res.body.body.data.book.authors.should.be.a('array').that.have.lengthOf(authorsIntegerCount);
            res.body.body.data.book.genres.should.be.a('array').that.have.lengthOf(genresIntegerCount);
        });
    });
});
