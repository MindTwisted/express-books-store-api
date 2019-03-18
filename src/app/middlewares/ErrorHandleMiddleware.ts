import View from '@views/index';
import ValidationErrorSerializer from '@serializers/ValidationErrorSerializer';

export default (err: any, req: any, res: any, next: Function) => {
    if (res.headersSent) {
        return next(err);
    }

    switch (err.name) {
        case 'SequelizeConnectionRefusedError':
        case 'SequelizeDatabaseError':
            return res.status(500).send(View.generate(
                "Unexpected error occurred. Please try again later.", null, false
            ));
        case 'SequelizeValidationError':
            return res.status(422).send(View.generate(
                "Validation failed.", {
                    errors: ValidationErrorSerializer.serialize(err.errors)
                }, false
            ));
        case 'NotFoundError':
            return res.status(404).send(View.generate(err.message, null, false));
        case 'UnauthorizedError':
            return res.status(401).send(View.generate(err.message, null, false));
        case 'ForbiddenError':
            return res.status(403).send(View.generate(err.message, null, false));
        default:
            return next(err);
    }
};