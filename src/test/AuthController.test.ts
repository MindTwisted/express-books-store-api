import './init';

process.env.NODE_ENV = 'test';

import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

const should = chai.should();

const AUTH_URL = '/api/auth';

chai.use(chaiHttp);

const agent = chai.request.agent(server);

describe('authController', () => {
    /**
     * Current auth tests
     */
    describe(`GET ${AUTH_URL}`, () => {
        it('should response with 401 if auth token was not provided', async () => {
            const res = await agent.get(AUTH_URL);

            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql('failed');
        });

        it('should response with 401 if invalid auth token was provided', async () => {
            const res = await agent.get(AUTH_URL).set('Authorization', 'Bearer 123');

            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql('failed');
        });

        it('should response with 200 and user info if valid auth token was provided', async () => {
            const token = (await agent.put(AUTH_URL).send({ email: 'john@example.com', password: 'secret' })).body.body
                .data.token;
            const res = await agent.get(AUTH_URL).set('Authorization', `Bearer ${token}`);

            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql('success');
            res.body.body.data.user.should.have.property('name');
            res.body.body.data.user.should.have.property('email');
        });
    });

    /**
     * Register tests
     */
    describe(`POST ${AUTH_URL}`, () => {
        it('should response with 422 if name, email and password were not provided', async () => {
            const res = await agent.post(AUTH_URL);

            res.should.have.status(422);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql('failed');
            res.body.body.data.errors.should.have.property('name');
            res.body.body.data.errors.should.have.property('email');
            res.body.body.data.errors.should.have.property('password');
        });

        it('should response with 422 if provided email was not valid', async () => {
            const res = await agent.post(AUTH_URL).send({
                name: 'John Walker',
                email: 'johnexample.com',
                password: 'secret',
            });

            res.should.have.status(422);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql('failed');
            res.body.body.data.errors.should.have.property('email');
        });

        it('should response with 422 if provided email has already existed', async () => {
            const res = await agent.post(AUTH_URL).send({
                name: 'John Walker',
                email: 'john@example.com',
                password: 'secret',
            });

            res.should.have.status(422);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql('failed');
            res.body.body.data.errors.should.have.property('email');
        });

        it('should response with 422 if provided password was less then 6 characters', async () => {
            const res = await agent.post(AUTH_URL).send({
                name: 'John Walker',
                email: 'johnunique@example.com',
                password: 'secre',
            });

            res.should.have.status(422);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql('failed');
            res.body.body.data.errors.should.have.property('password');
        });

        it('should response with 422 if provided name was less then 6 characters', async () => {
            const res = await agent.post(AUTH_URL).send({
                name: 'John',
                email: 'johnunique@example.com',
                password: 'secret',
            });

            res.should.have.status(422);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql('failed');
            res.body.body.data.errors.should.have.property('name');
        });

        it('should response with 200 if name, email and password were correctly provided', async () => {
            const res = await agent.post(AUTH_URL).send({
                name: 'John Walker',
                email: 'johnunique@example.com',
                password: 'secret',
            });

            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql('success');
            res.body.body.data.user.should.have.property('id');
            res.body.body.data.user.should.have.property('name');
            res.body.body.data.user.should.have.property('email');
        });
    });

    /**
     * Login tests
     */
    describe(`PUT ${AUTH_URL}`, () => {
        it('should response with 403 if empty request body was provided', async () => {
            const res = await agent.put(AUTH_URL);

            res.should.have.status(403);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql('failed');
        });

        it('should response with 403 if invalid email was provided', async () => {
            const res = await agent.put(AUTH_URL).send({
                email: 'wrong@email.com',
                password: 'secret',
            });

            res.should.have.status(403);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql('failed');
        });

        it('should response with 403 if invalid password was provided', async () => {
            const res = await agent.put(AUTH_URL).send({
                email: 'john@email.com',
                password: 'wrongsecret',
            });

            res.should.have.status(403);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql('failed');
        });

        it('should response with 200 and token if valid credentials were provided', async () => {
            const res = await agent.put(AUTH_URL).send({
                email: 'john@example.com',
                password: 'secret',
            });

            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql('success');
            res.body.body.data.should.have.property('token');
        });
    });
});
