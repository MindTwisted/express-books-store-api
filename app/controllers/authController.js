'use strict';

const view = require('@views/index');
const db = require('@models/index');
const User = db.User;

module.exports = {
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
    }
};