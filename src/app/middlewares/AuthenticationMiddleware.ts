import JwtService from '@services/JwtService';

export default (req: any, res: any, next: Function) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        return next();
    }

    const token = authorizationHeader.slice(7);

    if (!token) {
        return next();
    }

    const payload: any = JwtService.verify(token);

    if (!payload) {
        return next();
    }

    req.user = payload.user;

    return next();
};
