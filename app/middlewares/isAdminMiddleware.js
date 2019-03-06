'use strict';

const view = require('@views/index');

module.exports = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).send(view.generate("Access forbidden.", null, false));
    }
    
    next();
};