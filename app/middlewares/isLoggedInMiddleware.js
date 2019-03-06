const view = require('@views/index');

module.exports = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send(view.generate("Authentication required.", null, false));
    }
    
    next();
};