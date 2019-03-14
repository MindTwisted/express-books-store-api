require('./init');

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
    
        it('should response with 200 and authors limited by 50', done => {
            agent.get(AUTHORS_URL)
                .end((err: any, res: any) => {
                    res.should.have.status(200);
                    res.body.should.have.property('status').eql('success');
                    res.body.body.data.authors.should.be.a('array').that.have.lengthOf(50);
                    res.body.body.data.authors.should.each.have.property('id');
                    res.body.body.data.authors.should.each.have.property('name');
                    res.body.body.data.authors[0].should.have.property('id').eql(1);
                    
                    done();
                });
        });

        it('should response with 200 and authors shifted by offset if offset is a valid integer', done => {
            agent.get(`${AUTHORS_URL}?offset=100`)
                .end((err: any, res: any) => {
                    res.should.have.status(200);
                    res.body.should.have.property('status').eql('success');
                    res.body.body.data.authors.should.be.a('array').that.have.lengthOf(50);
                    res.body.body.data.authors.should.each.have.property('id');
                    res.body.body.data.authors.should.each.have.property('name');
                    res.body.body.data.authors[0].should.have.property('id').eql(101);
                    
                    done();
                });
        });

        it('should response with 200 and authors shifted by offset if offset is not a valid integer', done => {
            agent.get(`${AUTHORS_URL}?offset=100,2`)
                .end((err: any, res: any) => {
                    res.should.have.status(200);
                    res.body.should.have.property('status').eql('success');
                    res.body.body.data.authors.should.be.a('array').that.have.lengthOf(50);
                    res.body.body.data.authors.should.each.have.property('id');
                    res.body.body.data.authors.should.each.have.property('name');
                    res.body.body.data.authors[0].should.have.property('id').eql(101);
                    
                    done();
                });
        });

        it('should response with 200 and authors shifted by offset if offset is not a valid integer', done => {
            agent.get(`${AUTHORS_URL}?offset=100.2`)
                .end((err: any, res: any) => {
                    res.should.have.status(200);
                    res.body.should.have.property('status').eql('success');
                    res.body.body.data.authors.should.be.a('array').that.have.lengthOf(50);
                    res.body.body.data.authors.should.each.have.property('id');
                    res.body.body.data.authors.should.each.have.property('name');
                    res.body.body.data.authors[0].should.have.property('id').eql(101);
                    
                    done();
                });
        });

        it('should response with 200 and authors not shifted by offset if offset is not a valid number', done => {
            agent.get(`${AUTHORS_URL}?offset=abc`)
                .end((err: any, res: any) => {
                    res.should.have.status(200);
                    res.body.should.have.property('status').eql('success');
                    res.body.body.data.authors.should.be.a('array').that.have.lengthOf(50);
                    res.body.body.data.authors.should.each.have.property('id');
                    res.body.body.data.authors.should.each.have.property('name');
                    res.body.body.data.authors[0].should.have.property('id').eql(1);
                    
                    done();
                });
        });

    });

    /**
     * Authors show tests
     */
    describe(`GET ${AUTHORS_URL}/:id`, () => {

        it('should response with 200 and author if author with provided id exists', done => {
            agent.get(`${AUTHORS_URL}/1`)
                .end((err: any, res: any) => {
                    res.should.have.status(200);
                    res.body.should.have.property('status').eql('success');
                    res.body.body.data.should.have.property('author');
                    res.body.body.data.author.should.have.property('id');
                    res.body.body.data.author.should.have.property('name');
                    
                    done();
                });
        });

        it('should response with 404 if author with provided id does not exist', done => {
            agent.get(`${AUTHORS_URL}/999`)
                .end((err: any, res: any) => {
                    res.should.have.status(404);
                    res.body.should.have.property('status').eql('failed');
                    
                    done();
                });
        });

        it('should response with 404 if author with provided id does not exist', done => {
            agent.get(`${AUTHORS_URL}/abc`)
                .end((err: any, res: any) => {
                    res.should.have.status(404);
                    res.body.should.have.property('status').eql('failed');
                    
                    done();
                });
        });

    });

    /**
     * Authors store tests
     */
    describe(`POST ${AUTHORS_URL}`, () => {

        it('should response with 401 if auth token was not provided', done => {
            agent.post(AUTHORS_URL)
                .end((err: any, res: any) => {
                    res.should.have.status(401);
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
                        .end((err: any, res: any) => {
                            res.should.have.status(403);
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
                        .end((err: any, res: any) => {
                            res.should.have.status(422);
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
                        .end((err: any, res: any) => {
                            res.should.have.status(422);
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
                        .end((err: any, res: any) => {
                            
                            agent.post(AUTHORS_URL)
                                .send({
                                    name: 'Author'
                                })
                                .set('Authorization', `Bearer ${token}`)
                                .end((err: any, res: any) => {
                                    res.should.have.status(422);
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
                        .end((err: any, res: any) => {
                            
                            res.should.have.status(200);
                            res.body.should.have.property('status').eql('success');
                            res.body.body.data.author.should.have.property('id');
                            res.body.body.data.author.should.have.property('name');
                            
                            done();
                        });
                });
        });

    });

    /**
     * Author update tests
     */
    describe(`PUT ${AUTHORS_URL}/:id`, () => {

        it('should response with 401 if auth token was not provided', done => {
            agent.put(`${AUTHORS_URL}/1`)
                .end((err: any, res: any) => {
                    res.should.have.status(401);
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

                    agent.put(`${AUTHORS_URL}/1`)
                        .set('Authorization', `Bearer ${token}`)
                        .end((err: any, res: any) => {
                            res.should.have.status(403);
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

                    agent.put(`${AUTHORS_URL}/1`)
                        .set('Authorization', `Bearer ${token}`)
                        .end((err: any, res: any) => {
                            res.should.have.status(422);
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

                    agent.put(`${AUTHORS_URL}/1`)
                        .send({
                            name: 'Autho'
                        })
                        .set('Authorization', `Bearer ${token}`)
                        .end((err: any, res: any) => {
                            res.should.have.status(422);
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

                    agent.get(`${AUTHORS_URL}/1`)
                        .end((err: any, res: any) => {
                            const name = res.body.body.data.author.name;
                            
                            agent.put(`${AUTHORS_URL}/2`)
                                .send({
                                    name
                                })
                                .set('Authorization', `Bearer ${token}`)
                                .end((err: any, res: any) => {
                                    res.should.have.status(422);
                                    res.body.should.have.property('status').eql('failed');
                                    res.body.body.data.errors.should.have.property('name');
                                    
                                    done();
                                });

                        });
                });
        });

        it('should response with 200 if author name does not change', done => {
            agent.put(AUTH_URL)
                .send({
                    email: "john@example.com",
                    password: "secret"
                })
                .then(res => {
                    const token = res.body.body.data.token;

                    agent.get(`${AUTHORS_URL}/1`)
                        .end((err: any, res: any) => {
                            const name = res.body.body.data.author.name;
                            
                            agent.put(`${AUTHORS_URL}/1`)
                                .send({
                                    name
                                })
                                .set('Authorization', `Bearer ${token}`)
                                .end((err: any, res: any) => {
                                    res.should.have.status(200);
                                    res.body.should.have.property('status').eql('success');
                                    res.body.body.data.author.should.have.property('id');
                                    res.body.body.data.author.should.have.property('name');
                                    
                                    done();
                                });

                        });
                });
        });

        it('should response with 404 if author with provided id does not exist', done => {
            agent.put(AUTH_URL)
                .send({
                    email: "john@example.com",
                    password: "secret"
                })
                .then(res => {
                    const token = res.body.body.data.token;

                    agent.put(`${AUTHORS_URL}/999`)
                        .send({
                            name: 'Some unique name'
                        })
                        .set('Authorization', `Bearer ${token}`)
                        .end((err: any, res: any) => {
                            res.should.have.status(404);
                            res.body.should.have.property('status').eql('failed');
                            
                            done();
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

                    agent.put(`${AUTHORS_URL}/1`)
                        .send({
                            name: 'Unique Author For Update'
                        })
                        .set('Authorization', `Bearer ${token}`)
                        .end((err: any, res: any) => {
                            
                            res.should.have.status(200);
                            res.body.should.have.property('status').eql('success');
                            res.body.body.data.author.should.have.property('id');
                            res.body.body.data.author.should.have.property('name');
                            
                            done();
                        });
                });
        });
    
    });

    /**
     * Author destroy tests
     */
    describe(`DELETE ${AUTHORS_URL}/:id`, () => {

        it('should response with 401 if auth token was not provided', done => {
            agent.delete(`${AUTHORS_URL}/1`)
                .end((err: any, res: any) => {
                    res.should.have.status(401);
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

                    agent.delete(`${AUTHORS_URL}/1`)
                        .set('Authorization', `Bearer ${token}`)
                        .end((err: any, res: any) => {
                            res.should.have.status(403);
                            res.body.should.have.property('status').eql('failed');
                            
                            done();
                        });
                });
        });

        it('should response with 404 if author with provided id does not exist', done => {
            agent.put(AUTH_URL)
                .send({
                    email: "john@example.com",
                    password: "secret"
                })
                .then(res => {
                    const token = res.body.body.data.token;

                    agent.delete(`${AUTHORS_URL}/999`)
                        .set('Authorization', `Bearer ${token}`)
                        .end((err: any, res: any) => {
                            res.should.have.status(404);
                            res.body.should.have.property('status').eql('failed');
                            
                            done();
                        });
                });
        });

        it('should response with 200 if valid author id was provided', done => {
            agent.put(AUTH_URL)
                .send({
                    email: "john@example.com",
                    password: "secret"
                })
                .then(res => {
                    const token = res.body.body.data.token;

                    agent.delete(`${AUTHORS_URL}/1`)
                        .set('Authorization', `Bearer ${token}`)
                        .end((err: any, res: any) => {
                            res.should.have.status(200);
                            res.body.should.have.property('status').eql('success');
                            
                            done();
                        });
                });
        });

    });

});