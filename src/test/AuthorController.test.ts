import './init';

process.env.NODE_ENV = 'test';

import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiEach from 'chai-each';
import server from '../app';

const should = chai.should();

const AUTH_URL = '/api/auth';
const AUTHORS_URL = '/api/authors';

chai.use(chaiHttp);
chai.use(chaiEach);

const agent = chai.request.agent(server);

describe('authorsController', () => {
    /**
     * Authors index tests
     */
    describe(`GET ${AUTHORS_URL}`, () => {
        it('should response with 200 and authors limited by 50', async () => {
            const res = await agent.get(AUTHORS_URL);

            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.body.data.authors.should.be.a('array').that.have.lengthOf(50);
            res.body.body.data.authors.should.each.have.property('id');
            res.body.body.data.authors.should.each.have.property('name');
            res.body.body.data.authors[0].should.have.property('id').eql(1);
        });

        it('should response with 200 and authors shifted by offset if offset is a valid integer', async () => {
            const res = await agent.get(`${AUTHORS_URL}?offset=100`);

            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.body.data.authors.should.be.a('array').that.have.lengthOf(50);
            res.body.body.data.authors.should.each.have.property('id');
            res.body.body.data.authors.should.each.have.property('name');
            res.body.body.data.authors[0].should.have.property('id').eql(101);
        });

        it('should response with 200 and authors shifted by offset if offset is not a valid integer', async () => {
            const res = await agent.get(`${AUTHORS_URL}?offset=100,2`);

            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.body.data.authors.should.be.a('array').that.have.lengthOf(50);
            res.body.body.data.authors.should.each.have.property('id');
            res.body.body.data.authors.should.each.have.property('name');
            res.body.body.data.authors[0].should.have.property('id').eql(101);
        });

        it('should response with 200 and authors shifted by offset if offset is not a valid integer', async () => {
            const res = await agent.get(`${AUTHORS_URL}?offset=100.2`);

            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.body.data.authors.should.be.a('array').that.have.lengthOf(50);
            res.body.body.data.authors.should.each.have.property('id');
            res.body.body.data.authors.should.each.have.property('name');
            res.body.body.data.authors[0].should.have.property('id').eql(101);
        });

        it('should response with 200 and authors not shifted by offset if offset is not a valid number', async () => {
            const res = await agent.get(`${AUTHORS_URL}?offset=abc`);

            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.body.data.authors.should.be.a('array').that.have.lengthOf(50);
            res.body.body.data.authors.should.each.have.property('id');
            res.body.body.data.authors.should.each.have.property('name');
            res.body.body.data.authors[0].should.have.property('id').eql(1);
        });

        it('should response with 200 and authors filtered by search string', async () => {
            const searchString = 'Author for testing';
            const res = await agent.get(`${AUTHORS_URL}?search=${searchString}`);

            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.body.data.authors.should.be.a('array').that.have.lengthOf(10);
            res.body.body.data.authors.should.each.have.property('id');
            res.body.body.data.authors.should.each.have.property('name');
        });

        it('should response with 200 and authors filtered by search string', async () => {
            const searchString = 'Author for testing 1';
            const res = await agent.get(`${AUTHORS_URL}?search=${searchString}`);

            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.body.data.authors.should.be.a('array').that.have.lengthOf(1);
            res.body.body.data.authors.should.each.have.property('id');
            res.body.body.data.authors.should.each.have.property('name');
        });
    });

    /**
     * Authors show tests
     */
    describe(`GET ${AUTHORS_URL}/:id`, () => {
        it('should response with 200 and author if author with provided id exists', async () => {
            const res = await agent.get(`${AUTHORS_URL}/1`);

            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.body.data.should.have.property('author');
            res.body.body.data.author.should.have.property('id');
            res.body.body.data.author.should.have.property('name');
        });

        it('should response with 404 if author with provided id does not exist', async () => {
            const res = await agent.get(`${AUTHORS_URL}/999`);

            res.should.have.status(404);
            res.body.should.have.property('status').eql('failed');
        });

        it('should response with 404 if author with provided id does not exist', async () => {
            const res = await agent.get(`${AUTHORS_URL}/abc`);

            res.should.have.status(404);
            res.body.should.have.property('status').eql('failed');
        });
    });

    /**
     * Authors showBooks tests
     */
    describe(`GET ${AUTHORS_URL}/:id/books`, () => {
        it('should response with 200 and books filtered by author id', async () => {
            const authorId = 1;
            const res = await agent.get(`${AUTHORS_URL}/${authorId}/books`);

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
                .that.eql(authorId);
            res.body.body.data.books.should.each.have.property('authors').that.each.have.property('name');
            res.body.body.data.books.should.each.have.property('genres').that.each.have.property('id');
            res.body.body.data.books.should.each.have.property('genres').that.each.have.property('name');
        });

        it('should response with 200 and books filtered by author id and shifted by offset', async () => {
            const authorId = 1;
            const fullLength = (await agent.get(`${AUTHORS_URL}/${authorId}/books`)).body.body.data.books.length;
            const res = await agent.get(`${AUTHORS_URL}/${authorId}/books?offset=1`);

            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.body.data.books.should.be.a('array').that.have.lengthOf(fullLength - 1);
            res.body.body.data.books.should.each.have.property('id');
            res.body.body.data.books.should.each.have.property('title');
            res.body.body.data.books.should.each.have.property('description');
            res.body.body.data.books.should.each.have.property('imagePath');
            res.body.body.data.books.should.each.have.property('price');
            res.body.body.data.books.should.each.have.property('discount');
            res.body.body.data.books.should.each.have
                .property('authors')
                .that.each.have.property('id')
                .that.eql(authorId);
            res.body.body.data.books.should.each.have.property('authors').that.each.have.property('name');
            res.body.body.data.books.should.each.have.property('genres').that.each.have.property('id');
            res.body.body.data.books.should.each.have.property('genres').that.each.have.property('name');
        });
    });

    /**
     * Authors store tests
     */
    describe(`POST ${AUTHORS_URL}`, () => {
        it('should response with 401 if auth token was not provided', async () => {
            const res = await agent.post(AUTHORS_URL);

            res.should.have.status(401);
            res.body.should.have.property('status').eql('failed');
        });

        it('should response with 403 if auth token was not owned by admin', async () => {
            const token = (await agent.put(AUTH_URL).send({
                email: 'smith@example.com',
                password: 'secret',
            })).body.body.data.token;
            const res = await agent.post(AUTHORS_URL).set('Authorization', `Bearer ${token}`);

            res.should.have.status(403);
            res.body.should.have.property('status').eql('failed');
        });

        it('should response with 422 if author name was not provided', async () => {
            const token = (await agent.put(AUTH_URL).send({
                email: 'john@example.com',
                password: 'secret',
            })).body.body.data.token;
            const res = await agent.post(AUTHORS_URL).set('Authorization', `Bearer ${token}`);

            res.should.have.status(422);
            res.body.should.have.property('status').eql('failed');
            res.body.body.data.errors.should.have.property('name');
        });

        it('should response with 422 if author name was less than 6 characters', async () => {
            const token = (await agent.put(AUTH_URL).send({
                email: 'john@example.com',
                password: 'secret',
            })).body.body.data.token;
            const res = await agent
                .post(AUTHORS_URL)
                .send({
                    name: 'Autho',
                })
                .set('Authorization', `Bearer ${token}`);

            res.should.have.status(422);
            res.body.should.have.property('status').eql('failed');
            res.body.body.data.errors.should.have.property('name');
        });

        it('should response with 422 if author name has already existed', async () => {
            const token = (await agent.put(AUTH_URL).send({
                email: 'john@example.com',
                password: 'secret',
            })).body.body.data.token;

            await agent
                .post(AUTHORS_URL)
                .send({
                    name: 'Author',
                })
                .set('Authorization', `Bearer ${token}`);

            const res = await agent
                .post(AUTHORS_URL)
                .send({
                    name: 'Author',
                })
                .set('Authorization', `Bearer ${token}`);

            res.should.have.status(422);
            res.body.should.have.property('status').eql('failed');
            res.body.body.data.errors.should.have.property('name');
        });

        it('should response with 200 and author if valid data was provided', async () => {
            const token = (await agent.put(AUTH_URL).send({
                email: 'john@example.com',
                password: 'secret',
            })).body.body.data.token;
            const res = await agent
                .post(AUTHORS_URL)
                .send({
                    name: 'Unique Author',
                })
                .set('Authorization', `Bearer ${token}`);

            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.body.data.author.should.have.property('id');
            res.body.body.data.author.should.have.property('name');
        });
    });

    /**
     * Author update tests
     */
    describe(`PUT ${AUTHORS_URL}/:id`, () => {
        it('should response with 401 if auth token was not provided', async () => {
            const res = await agent.put(`${AUTHORS_URL}/1`);

            res.should.have.status(401);
            res.body.should.have.property('status').eql('failed');
        });

        it('should response with 403 if auth token was not owned by admin', async () => {
            const token = (await agent.put(AUTH_URL).send({
                email: 'smith@example.com',
                password: 'secret',
            })).body.body.data.token;
            const res = await agent.put(`${AUTHORS_URL}/1`).set('Authorization', `Bearer ${token}`);

            res.should.have.status(403);
            res.body.should.have.property('status').eql('failed');
        });

        it('should response with 422 if author name was not provided', async () => {
            const token = (await agent.put(AUTH_URL).send({
                email: 'john@example.com',
                password: 'secret',
            })).body.body.data.token;
            const res = await agent.put(`${AUTHORS_URL}/1`).set('Authorization', `Bearer ${token}`);

            res.should.have.status(422);
            res.body.should.have.property('status').eql('failed');
            res.body.body.data.errors.should.have.property('name');
        });

        it('should response with 422 if author name was less than 6 characters', async () => {
            const token = (await agent.put(AUTH_URL).send({
                email: 'john@example.com',
                password: 'secret',
            })).body.body.data.token;
            const res = await agent
                .put(`${AUTHORS_URL}/1`)
                .send({
                    name: 'Autho',
                })
                .set('Authorization', `Bearer ${token}`);

            res.should.have.status(422);
            res.body.should.have.property('status').eql('failed');
            res.body.body.data.errors.should.have.property('name');
        });

        it('should response with 422 if author name has already existed', async () => {
            const token = (await agent.put(AUTH_URL).send({
                email: 'john@example.com',
                password: 'secret',
            })).body.body.data.token;
            const existedName = (await agent.get(`${AUTHORS_URL}/1`)).body.body.data.author.name;
            const res = await agent
                .put(`${AUTHORS_URL}/2`)
                .send({
                    name: existedName,
                })
                .set('Authorization', `Bearer ${token}`);

            res.should.have.status(422);
            res.body.should.have.property('status').eql('failed');
            res.body.body.data.errors.should.have.property('name');
        });

        it('should response with 200 if author name does not change', async () => {
            const token = (await agent.put(AUTH_URL).send({
                email: 'john@example.com',
                password: 'secret',
            })).body.body.data.token;
            const currentName = (await agent.get(`${AUTHORS_URL}/1`)).body.body.data.author.name;
            const res = await agent
                .put(`${AUTHORS_URL}/1`)
                .send({
                    name: currentName,
                })
                .set('Authorization', `Bearer ${token}`);

            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.body.data.author.should.have.property('id');
            res.body.body.data.author.should.have.property('name');
        });

        it('should response with 404 if author with provided id does not exist', async () => {
            const token = (await agent.put(AUTH_URL).send({
                email: 'john@example.com',
                password: 'secret',
            })).body.body.data.token;
            const res = await agent
                .put(`${AUTHORS_URL}/999`)
                .send({
                    name: 'Some unique name',
                })
                .set('Authorization', `Bearer ${token}`);

            res.should.have.status(404);
            res.body.should.have.property('status').eql('failed');
        });

        it('should response with 200 and author if valid data was provided', async () => {
            const token = (await agent.put(AUTH_URL).send({
                email: 'john@example.com',
                password: 'secret',
            })).body.body.data.token;
            const res = await agent
                .put(`${AUTHORS_URL}/1`)
                .send({
                    name: 'Unique Author For Update',
                })
                .set('Authorization', `Bearer ${token}`);

            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.body.data.author.should.have.property('id');
            res.body.body.data.author.should.have.property('name');
        });
    });

    /**
     * Author destroy tests
     */
    describe(`DELETE ${AUTHORS_URL}/:id`, () => {
        it('should response with 401 if auth token was not provided', async () => {
            const res = await agent.delete(`${AUTHORS_URL}/1`);

            res.should.have.status(401);
            res.body.should.have.property('status').eql('failed');
        });

        it('should response with 403 if auth token was not owned by admin', async () => {
            const token = (await agent.put(AUTH_URL).send({
                email: 'smith@example.com',
                password: 'secret',
            })).body.body.data.token;
            const res = await agent.delete(`${AUTHORS_URL}/1`).set('Authorization', `Bearer ${token}`);

            res.should.have.status(403);
            res.body.should.have.property('status').eql('failed');
        });

        it('should response with 404 if author with provided id does not exist', async () => {
            const token = (await agent.put(AUTH_URL).send({
                email: 'john@example.com',
                password: 'secret',
            })).body.body.data.token;
            const res = await agent.delete(`${AUTHORS_URL}/999`).set('Authorization', `Bearer ${token}`);

            res.should.have.status(404);
            res.body.should.have.property('status').eql('failed');
        });

        it('should response with 200 if valid author id was provided', async () => {
            const token = (await agent.put(AUTH_URL).send({
                email: 'john@example.com',
                password: 'secret',
            })).body.body.data.token;
            const res = await agent.delete(`${AUTHORS_URL}/1`).set('Authorization', `Bearer ${token}`);

            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
        });
    });
});
