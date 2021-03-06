import './init';

process.env.NODE_ENV = 'test';

import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiEach from 'chai-each';
import server from '../app';

const should = chai.should();

const AUTH_URL = '/api/auth';
const GENRES_URL = '/api/genres';

chai.use(chaiHttp);
chai.use(chaiEach);

const agent = chai.request.agent(server);

describe('genresController', () => {
    /**
     * Genres index tests
     */
    describe(`GET ${GENRES_URL}`, () => {
        it('should response with 200 and genres limited by 50', async () => {
            const res = await agent.get(GENRES_URL);

            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.body.data.genres.should.be.a('array').that.have.lengthOf(50);
            res.body.body.data.genres.should.each.have.property('id');
            res.body.body.data.genres.should.each.have.property('name');
            res.body.body.data.genres[0].should.have.property('id').eql(1);
        });

        it('should response with 200 and genres shifted by offset if offset is a valid integer', async () => {
            const res = await agent.get(`${GENRES_URL}?offset=50`);

            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.body.data.genres.should.be.a('array').that.have.lengthOf(50);
            res.body.body.data.genres.should.each.have.property('id');
            res.body.body.data.genres.should.each.have.property('name');
            res.body.body.data.genres[0].should.have.property('id').eql(51);
        });

        it('should response with 200 and genres shifted by offset if offset is not a valid integer', async () => {
            const res = await agent.get(`${GENRES_URL}?offset=50,2`);

            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.body.data.genres.should.be.a('array').that.have.lengthOf(50);
            res.body.body.data.genres.should.each.have.property('id');
            res.body.body.data.genres.should.each.have.property('name');
            res.body.body.data.genres[0].should.have.property('id').eql(51);
        });

        it('should response with 200 and genres shifted by offset if offset is not a valid integer', async () => {
            const res = await agent.get(`${GENRES_URL}?offset=50.2`);

            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.body.data.genres.should.be.a('array').that.have.lengthOf(50);
            res.body.body.data.genres.should.each.have.property('id');
            res.body.body.data.genres.should.each.have.property('name');
            res.body.body.data.genres[0].should.have.property('id').eql(51);
        });

        it('should response with 200 and genres not shifted by offset if offset is not a valid number', async () => {
            const res = await agent.get(`${GENRES_URL}?offset=abc`);

            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.body.data.genres.should.be.a('array').that.have.lengthOf(50);
            res.body.body.data.genres.should.each.have.property('id');
            res.body.body.data.genres.should.each.have.property('name');
            res.body.body.data.genres[0].should.have.property('id').eql(1);
        });

        it('should response with 200 and genres filtered by search string', async () => {
            const searchString = 'Genre for testing';
            const res = await agent.get(`${GENRES_URL}?search=${searchString}`);

            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.body.data.genres.should.be.a('array').that.have.lengthOf(10);
            res.body.body.data.genres.should.each.have.property('id');
            res.body.body.data.genres.should.each.have.property('name');
        });

        it('should response with 200 and genres filtered by search string', async () => {
            const searchString = 'Genre for testing 1';
            const res = await agent.get(`${GENRES_URL}?search=${searchString}`);

            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.body.data.genres.should.be.a('array').that.have.lengthOf(1);
            res.body.body.data.genres.should.each.have.property('id');
            res.body.body.data.genres.should.each.have.property('name');
        });
    });

    /**
     * Genres show tests
     */
    describe(`GET ${GENRES_URL}/:id`, () => {
        it('should response with 200 and genre if genre with provided id exists', async () => {
            const genreId = 1;
            const res = await agent.get(`${GENRES_URL}/${genreId}`);

            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.body.data.should.have.property('genre');
            res.body.body.data.genre.should.have.property('id').eql(genreId);
            res.body.body.data.genre.should.have.property('name');
        });

        it('should response with 404 if genre with provided id does not exist', async () => {
            const genreId = 999;
            const res = await agent.get(`${GENRES_URL}/${genreId}`);

            res.should.have.status(404);
            res.body.should.have.property('status').eql('failed');
        });

        it('should response with 404 if genre with provided id does not exist', async () => {
            const genreId = 'abc';
            const res = await agent.get(`${GENRES_URL}/${genreId}`);

            res.should.have.status(404);
            res.body.should.have.property('status').eql('failed');
        });
    });

    /**
     * Genres showBooks tests
     */
    describe(`GET ${GENRES_URL}/:id/books`, () => {
        it('should response with 200 and books filtered by genre id', async () => {
            const genreId = 1;
            const res = await agent.get(`${GENRES_URL}/${genreId}/books`);

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
                .that.eql(genreId);
            res.body.body.data.books.should.each.have.property('genres').that.each.have.property('name');
        });

        it('should response with 200 and books filtered by genre id and shifted by offset', async () => {
            const genreId = 1;
            const fullLength = (await agent.get(`${GENRES_URL}/${genreId}/books`)).body.body.data.books.length;
            const res = await agent.get(`${GENRES_URL}/${genreId}/books?offset=1`);

            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.body.data.books.should.be.a('array').that.have.lengthOf(fullLength - 1);
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
                .that.eql(genreId);
            res.body.body.data.books.should.each.have.property('genres').that.each.have.property('name');
        });
    });

    /**
     * Genres store tests
     */
    describe(`POST ${GENRES_URL}`, () => {
        it('should response with 401 if auth token was not provided', async () => {
            const res = await agent.post(GENRES_URL);

            res.should.have.status(401);
            res.body.should.have.property('status').eql('failed');
        });

        it('should response with 403 if auth token was not owned by admin', async () => {
            const token = (await agent.put(AUTH_URL).send({
                email: 'smith@example.com',
                password: 'secret',
            })).body.body.data.token;
            const res = await agent.post(GENRES_URL).set('Authorization', `Bearer ${token}`);

            res.should.have.status(403);
            res.body.should.have.property('status').eql('failed');
        });

        it('should response with 422 if genre name was not provided', async () => {
            const token = (await agent.put(AUTH_URL).send({
                email: 'john@example.com',
                password: 'secret',
            })).body.body.data.token;
            const res = await agent.post(GENRES_URL).set('Authorization', `Bearer ${token}`);

            res.should.have.status(422);
            res.body.should.have.property('status').eql('failed');
            res.body.body.data.errors.should.have.property('name');
        });

        it('should response with 422 if genre name was less than 6 characters', async () => {
            const token = (await agent.put(AUTH_URL).send({
                email: 'john@example.com',
                password: 'secret',
            })).body.body.data.token;
            const res = await agent
                .post(GENRES_URL)
                .send({
                    name: 'Some',
                })
                .set('Authorization', `Bearer ${token}`);

            res.should.have.status(422);
            res.body.should.have.property('status').eql('failed');
            res.body.body.data.errors.should.have.property('name');
        });

        it('should response with 422 if genre name has already existed', async () => {
            const token = (await agent.put(AUTH_URL).send({
                email: 'john@example.com',
                password: 'secret',
            })).body.body.data.token;

            await agent
                .post(GENRES_URL)
                .send({
                    name: 'Genre 1',
                })
                .set('Authorization', `Bearer ${token}`);

            const res = await agent
                .post(GENRES_URL)
                .send({
                    name: 'Genre 1',
                })
                .set('Authorization', `Bearer ${token}`);

            res.should.have.status(422);
            res.body.should.have.property('status').eql('failed');
            res.body.body.data.errors.should.have.property('name');
        });

        it('should response with 200 and genre if valid data was provided', async () => {
            const token = (await agent.put(AUTH_URL).send({
                email: 'john@example.com',
                password: 'secret',
            })).body.body.data.token;
            const res = await agent
                .post(GENRES_URL)
                .send({
                    name: 'Unique Genre',
                })
                .set('Authorization', `Bearer ${token}`);

            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.body.data.genre.should.have.property('id');
            res.body.body.data.genre.should.have.property('name');
        });
    });

    /**
     * Genre update tests
     */
    describe(`PUT ${GENRES_URL}/:id`, () => {
        it('should response with 401 if auth token was not provided', async () => {
            const res = await agent.put(`${GENRES_URL}/1`);

            res.should.have.status(401);
            res.body.should.have.property('status').eql('failed');
        });

        it('should response with 403 if auth token was not owned by admin', async () => {
            const token = (await agent.put(AUTH_URL).send({
                email: 'smith@example.com',
                password: 'secret',
            })).body.body.data.token;
            const res = await agent.put(`${GENRES_URL}/1`).set('Authorization', `Bearer ${token}`);

            res.should.have.status(403);
            res.body.should.have.property('status').eql('failed');
        });

        it('should response with 422 if genre name was not provided', async () => {
            const token = (await agent.put(AUTH_URL).send({
                email: 'john@example.com',
                password: 'secret',
            })).body.body.data.token;
            const res = await agent.put(`${GENRES_URL}/1`).set('Authorization', `Bearer ${token}`);

            res.should.have.status(422);
            res.body.should.have.property('status').eql('failed');
            res.body.body.data.errors.should.have.property('name');
        });

        it('should response with 422 if genre name was less than 6 characters', async () => {
            const token = (await agent.put(AUTH_URL).send({
                email: 'john@example.com',
                password: 'secret',
            })).body.body.data.token;
            const res = await agent
                .put(`${GENRES_URL}/1`)
                .send({
                    name: 'Some',
                })
                .set('Authorization', `Bearer ${token}`);

            res.should.have.status(422);
            res.body.should.have.property('status').eql('failed');
            res.body.body.data.errors.should.have.property('name');
        });

        it('should response with 422 if genre name has already existed', async () => {
            const token = (await agent.put(AUTH_URL).send({
                email: 'john@example.com',
                password: 'secret',
            })).body.body.data.token;
            const existedName = (await agent.get(`${GENRES_URL}/1`)).body.body.data.genre.name;
            const res = await agent
                .put(`${GENRES_URL}/2`)
                .send({
                    name: existedName,
                })
                .set('Authorization', `Bearer ${token}`);

            res.should.have.status(422);
            res.body.should.have.property('status').eql('failed');
            res.body.body.data.errors.should.have.property('name');
        });

        it('should response with 200 if genre name does not change', async () => {
            const token = (await agent.put(AUTH_URL).send({
                email: 'john@example.com',
                password: 'secret',
            })).body.body.data.token;
            const currentName = (await agent.get(`${GENRES_URL}/1`)).body.body.data.genre.name;
            const res = await agent
                .put(`${GENRES_URL}/1`)
                .send({
                    name: currentName,
                })
                .set('Authorization', `Bearer ${token}`);

            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.body.data.genre.should.have.property('id');
            res.body.body.data.genre.should.have.property('name');
        });

        it('should response with 404 if genre with provided id does not exist', async () => {
            const token = (await agent.put(AUTH_URL).send({
                email: 'john@example.com',
                password: 'secret',
            })).body.body.data.token;
            const res = await agent
                .put(`${GENRES_URL}/999`)
                .send({
                    name: 'Some unique name',
                })
                .set('Authorization', `Bearer ${token}`);

            res.should.have.status(404);
            res.body.should.have.property('status').eql('failed');
        });

        it('should response with 200 and genre if valid data was provided', async () => {
            const token = (await agent.put(AUTH_URL).send({
                email: 'john@example.com',
                password: 'secret',
            })).body.body.data.token;
            const res = await agent
                .put(`${GENRES_URL}/1`)
                .send({
                    name: 'Unique Genre For Update',
                })
                .set('Authorization', `Bearer ${token}`);

            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
            res.body.body.data.genre.should.have.property('id');
            res.body.body.data.genre.should.have.property('name');
        });
    });

    /**
     * Genre destroy tests
     */
    describe(`DELETE ${GENRES_URL}/:id`, () => {
        it('should response with 401 if auth token was not provided', async () => {
            const res = await agent.delete(`${GENRES_URL}/1`);

            res.should.have.status(401);
            res.body.should.have.property('status').eql('failed');
        });

        it('should response with 403 if auth token was not owned by admin', async () => {
            const token = (await agent.put(AUTH_URL).send({
                email: 'smith@example.com',
                password: 'secret',
            })).body.body.data.token;
            const res = await agent.delete(`${GENRES_URL}/1`).set('Authorization', `Bearer ${token}`);

            res.should.have.status(403);
            res.body.should.have.property('status').eql('failed');
        });

        it('should response with 404 if genre with provided id does not exist', async () => {
            const token = (await agent.put(AUTH_URL).send({
                email: 'john@example.com',
                password: 'secret',
            })).body.body.data.token;
            const res = await agent.delete(`${GENRES_URL}/999`).set('Authorization', `Bearer ${token}`);

            res.should.have.status(404);
            res.body.should.have.property('status').eql('failed');
        });

        it('should response with 200 if valid genre id was provided', async () => {
            const token = (await agent.put(AUTH_URL).send({
                email: 'john@example.com',
                password: 'secret',
            })).body.body.data.token;
            const res = await agent.delete(`${GENRES_URL}/1`).set('Authorization', `Bearer ${token}`);

            res.should.have.status(200);
            res.body.should.have.property('status').eql('success');
        });
    });
});
