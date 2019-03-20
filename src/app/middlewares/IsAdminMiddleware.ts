import ForbiddenError from '@errors/ForbiddenError';

export default (req: any, res: any, next: Function) => {
    if (req.user.role !== 'admin') {
        return next(new ForbiddenError('Access forbidden.'));
    }

    next();
};
