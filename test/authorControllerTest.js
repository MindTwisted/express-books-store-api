'use strict';

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const spawn = require('child-process-promise').spawn;
const spawnOptions = { stdio: 'inherit' };

const AUTH_URL = '/api/auth';
const AUTHORS_URL = '/api/authors';

chai.use(chaiHttp);

const agent = chai.request.agent(server);

describe('authorsController', () => {
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
     * Create author tests
     */
    describe(`POST ${AUTHORS_URL}`, () => {

        it('should response with 401 if auth token was not provided', done => {
            agent.post(AUTHORS_URL)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('failed');
                    
                    done();
                });
        });

        it('should response with 403 if auth token was not owned by admin', done => {
            agent.put(AUTH_URL)
                .send({
                    email: "smith@example.com",
                    password: "secret"
                })
                .then(res => {
                    const token = res.body.body.data.token;

                    agent.post(AUTHORS_URL)
                        .set('Authorization', `Bearer ${token}`)
                        .end((err, res) => {
                            res.should.have.status(403);
                            res.body.should.be.a('object');
                            res.body.should.have.property('status').eql('failed');
                            
                            done();
                        });
                });
        });

        it('should response with 422 if author name was not provided', done => {
            agent.put(AUTH_URL)
                .send({
                    email: "john@example.com",
                    password: "secret"
                })
                .then(res => {
                    const token = res.body.body.data.token;

                    agent.post(AUTHORS_URL)
                        .set('Authorization', `Bearer ${token}`)
                        .end((err, res) => {
                            res.should.have.status(422);
                            res.body.should.be.a('object');
                            res.body.should.have.property('status').eql('failed');
                            res.body.body.data.errors.should.have.property('name');
                            
                            done();
                        });
                });
        });

        it('should response with 422 if author name was less than 6 characters', done => {
            agent.put(AUTH_URL)
                .send({
                    email: "john@example.com",
                    password: "secret"
                })
                .then(res => {
                    const token = res.body.body.data.token;

                    agent.post(AUTHORS_URL)
                        .send({
                            name: 'Autho'
                        })
                        .set('Authorization', `Bearer ${token}`)
                        .end((err, res) => {
                            res.should.have.status(422);
                            res.body.should.be.a('object');
                            res.body.should.have.property('status').eql('failed');
                            res.body.body.data.errors.should.have.property('name');
                            
                            done();
                        });
                });
        });

        it('should response with 422 if author name has already existed', done => {
            agent.put(AUTH_URL)
                .send({
                    email: "john@example.com",
                    password: "secret"
                })
                .then(res => {
                    const token = res.body.body.data.token;

                    agent.post(AUTHORS_URL)
                        .send({
                            name: 'Author'
                        })
                        .set('Authorization', `Bearer ${token}`)
                        .end((err, res) => {
                            
                            agent.post(AUTHORS_URL)
                                .send({
                                    name: 'Author'
                                })
                                .set('Authorization', `Bearer ${token}`)
                                .end((err, res) => {
                                    res.should.have.status(422);
                                    res.body.should.be.a('object');
                                    res.body.should.have.property('status').eql('failed');
                                    res.body.body.data.errors.should.have.property('name');
                                    
                                    done();
                                });

                        });
                });
        });

        it('should response with 200 and author if valid data was provided', done => {
            agent.put(AUTH_URL)
                .send({
                    email: "john@example.com",
                    password: "secret"
                })
                .then(res => {
                    const token = res.body.body.data.token;

                    agent.post(AUTHORS_URL)
                        .send({
                            name: 'Unique Author'
                        })
                        .set('Authorization', `Bearer ${token}`)
                        .end((err, res) => {
                            
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('status').eql('success');
                            res.body.body.data.author.should.have.property('id');
                            res.body.body.data.author.should.have.property('name');
                            
                            done();
                        });
                });
        });

    });

});