import UnauthorizedError from '@errors/UnauthorizedError';

export default (req: any, res: any, next: Function) => {
    if (!req.user) {
        return next(new UnauthorizedError('Authentication required.'));
    }

    next();
};
