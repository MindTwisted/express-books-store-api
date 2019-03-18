import View from '@views/index';
import {User} from '@models/User';
import UserRepository from '@repositories/UserRepository';

class AuthController {

    /**
     * Get currently authenticated user info
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    current(req: any, res: any, next: Function): void {
        const user: User = req.user;
        const data = {
            user
        };

        res.status(200).send(View.generate(null, data));
    }
    
    /**
     * Register new user
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    register(req: any, res: any, next: Function): void {
        const body = req.body;

        UserRepository.create({
                name: body.name,
                email: body.email,
                password: body.password
            })
            .then((user: User) => {
                const text = 'User was successfully registered.';
                const data = {
                    user
                };

                res.status(200).send(View.generate(text, data));
            })
            .catch(error => {
                next(error);
            });
    }

    /**
     * Login user
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    login(req: any, res: any, next: Function): void {
        const user: User = req.user;
        const token: string = req.token;

        if (!user || !token) {
            return res.status(403).send(View.generate("Invalid credentials.", null, false));
        }

        const text = `User ${user.name} was successfully logged in.`;
        const data = {
            user,
            token
        };

        res.status(200).send(View.generate(text, data));
    }
    
}

export default new AuthController();