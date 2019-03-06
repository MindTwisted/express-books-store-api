'use strict';

const bcrypt = require('bcrypt');
const view = require('@views/index');
const db = require('@models/index');
const User = db.User;
const jwtService = require('@services/jwtService');

module.exports = {
    current(req, res, next) {
        const user = req.user;
        const data = {
            user
        };

        res.status(200).send(view.generate(null, data));
    },
    
    register(req, res, next) {
        const body = req.body;

        User.create({
                name: body.name,
                email: body.email,
                password: body.password
            })
            .then(user => {
                const text = 'User was successfully registered.';
                const data = {
                    user
                };

                res.status(200).send(view.generate(text, data));
            }).catch(next);
    },

    login(req, res, next) {
        const body = req.body;
        const email = body.email;
        const password = body.password;

        User.findOne({
                where: {email}
            })
            .then(user => {
                if (!user) {
                    return res.status(403).send(view.generate("Invalid credentials.", null, false));
                }

                return bcrypt.compare(password, user.password)
                    .then(result => {
                        if (!result) {
                            return res.status(403).send(view.generate("Invalid credentials.", null, false));
                        }

                        const token = jwtService.sign({
                            user
                        });

                        const text = `User ${user.name} was successfully logged in.`;
                        const data = {
                            user,
                            token
                        };

                        res.status(200).send(view.generate(text, data));
                    })
            }).catch(next);
    }
};