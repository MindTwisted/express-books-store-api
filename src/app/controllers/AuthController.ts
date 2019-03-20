import JsonView from '@views/JsonView';
import User from '@models/User';
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

        JsonView.render(res, { code: 200, data: { user } });
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

            JsonView.render(res, { code: 200, text: 'User was successfully registered.', data: { user } });
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
            return JsonView.render(res, { code: 403, text: 'Invalid credentials.' });
        }

        JsonView.render(res, {
            code: 200,
            text: `User ${user.name} was successfully logged in.`,
            data: { user, token },
        });
    }
}

export default new AuthController();
