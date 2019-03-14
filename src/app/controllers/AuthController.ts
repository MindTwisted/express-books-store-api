import bcrypt from 'bcrypt';
import View from '@views/index';
import db from '@models/index';
import JwtService from '@services/JwtService';

const User = db.User;

class AuthController {

    /**
     * Get currently authenticated user info
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    current(req: any, res: any, next: Function): void {
        const user = req.user;
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

        User.create({
                name: body.name,
                email: body.email,
                password: body.password
            })
            .then((user: any) => {
                const text = 'User was successfully registered.';
                const data = {
                    user
                };

                res.status(200).send(View.generate(text, data));
            }).catch(next);
    }

    /**
     * Login user
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    login(req: any, res: any, next: Function): void {
        const body = req.body;
        const email = body.email;
        const password = body.password;

        User.findOne({
                where: {email}
            })
            .then((user: any) => {
                if (!user) {
                    return res.status(403).send(View.generate("Invalid credentials.", null, false));
                }

                return bcrypt.compare(password, user.password)
                    .then(result => {
                        if (!result) {
                            return res.status(403).send(View.generate("Invalid credentials.", null, false));
                        }

                        const token = JwtService.sign({
                            user
                        });

                        const text = `User ${user.name} was successfully logged in.`;
                        const data = {
                            user,
                            token
                        };

                        res.status(200).send(View.generate(text, data));
                    })
            }).catch(next);
    }
    
}

export default new AuthController();