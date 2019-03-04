const view = require('@views/index');
const validationErrorSerializer = require('@serializers/validationErrorSerializer');

module.exports = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    switch (err.name) {
        case 'SequelizeConnectionRefusedError':
        case 'SequelizeDatabaseError':
            return res.status(500).send(view.generate(
                "Unexpected error occurred. Please try again later.", null, false
            ));
        case 'SequelizeValidationError':
            return res.status(422).send(view.generate(
                "Validation failed.", {
                    errors: validationErrorSerializer.serialize(err.errors)
                }, false
            ));
        case 'NotFoundError':
            return res.status(404).send(view.generate(err.message, null, false));
        default:
            return next(err);
    }
};