import View from '@views/index';

export default (req: any, res: any, next: Function) => {
    if (!req.user) {
        return res.status(401).send(View.generate("Authentication required.", null, false));
    }
    
    next();
};