import View from '@views/index';
import { User } from '@models/User';
import UserRepository from '@repositories/UserRepository';

class AuthController {
    /**
     * Get currently authenticated user info
     *
     * @param req
     * @param res
     * @param next
     */
    public current(req: any, res: any, next: Function) {
        const user: User = req.user;

        res.status(200).send(View.generate(null, { user }));
    }

    /**
     * Register new user
     *
     * @param req
     * @param res
     * @param next
     */
    public async register(req: any, res: any, next: Function) {
        try {
            const user: User = await UserRepository.create(req.body);

            res.status(200).send(View.generate('User was successfully registered.', { user }));
        } catch (error) {
            next(error);
        }
    }

    /**
     * Login user
     *
     * @param req
     * @param res
     * @param next
     */
    public login(req: any, res: any, next: Function) {
        const user: User = req.user;
        const token: string = req.token;

        if (!(user && token)) {
            return res.status(403).send(View.generate('Invalid credentials.', null, false));
        }

        res.status(200).send(View.generate(`User ${user.name} was successfully logged in.`, { user, token }));
    }
}

export default new AuthController();
