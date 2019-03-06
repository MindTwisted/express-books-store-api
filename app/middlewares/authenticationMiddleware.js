'use strict';

const jwtService = require('@services/jwtService');

module.exports = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        return next();
    }

    const token = authorizationHeader.slice(7);

    if (!token) {
        return next();
    }

    const payload = jwtService.verify(token);

    if (!payload) {
        return next();
    }
    
    req.user = payload.user;

    return next();
};