import View from '@views/index';

export default (req: any, res: any, next: Function) => {
    if (req.user.role !== 'admin') {
        return res.status(403).send(View.generate("Access forbidden.", null, false));
    }
    
    next();
};