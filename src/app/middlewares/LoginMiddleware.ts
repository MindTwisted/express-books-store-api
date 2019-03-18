import bcrypt from 'bcrypt';
import JwtService from '@services/JwtService';
import {User} from '@models/User';
import UserRepository from '@repositories/UserRepository';

export default (req: any, res: any, next: Function) => {
    const body = req.body;
    const email = body.email;
    const password = body.password;

    if (!email || !password) {
        return next();
    }

    UserRepository.findOne({
            email
        })
        .then((user: User | null) => {
            if (!user) {
                return next();
            }

            return bcrypt.compare(password, user.password)
                .then(result => {
                    if (!result) {
                        return next();
                    }

                    const token = JwtService.sign({
                        user
                    });

                    req.user = user;
                    req.token = token;

                    return next();
                });
        })
        .catch(error => {
            next(error);
        });
}