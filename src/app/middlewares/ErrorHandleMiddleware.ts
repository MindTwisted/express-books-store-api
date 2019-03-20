import JsonView from '@views/JsonView';
import ValidationErrorSerializer from '@serializers/ValidationErrorSerializer';

export default (err: any, req: any, res: any, next: Function) => {
    if (res.headersSent) {
        return next(err);
    }

    switch (err.name) {
        case 'SequelizeConnectionRefusedError':
        case 'SequelizeDatabaseError':
        case 'SequelizeConnectionError':
            return JsonView.render(res, { code: 500, text: 'Unexpected error occurred. Please try again later.' });
        case 'SequelizeValidationError':
            return JsonView.render(res, {
                code: 422,
                text: 'Validation failed.',
                data: { errors: ValidationErrorSerializer.serialize(err.errors) },
            });
        case 'NotFoundError':
            return JsonView.render(res, { code: 404, text: err.message });
        case 'UnauthorizedError':
            return JsonView.render(res, { code: 401, text: err.message });
        case 'ForbiddenError':
            return JsonView.render(res, { code: 403, text: err.message });
        default:
            return next(err);
    }
};
