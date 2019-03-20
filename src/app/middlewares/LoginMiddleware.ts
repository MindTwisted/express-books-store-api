import bcrypt from 'bcrypt';
import JwtService from '@services/JwtService';
import { User } from '@models/User';
import UserRepository from '@repositories/UserRepository';

export default async (req: any, res: any, next: Function) => {
    const body = req.body;
    const email = body.email;
    const password = body.password;

    if (!(email && password)) {
        return next();
    }

    try {
        const user: User | null = await UserRepository.findOne({ email });

        if (!user) {
            return next();
        }

        const result: boolean = await bcrypt.compare(password, user.password);

        if (!result) {
            return next();
        }

        const token = JwtService.sign({ user });

        req.user = user;
        req.token = token;

        return next();
    } catch (error) {
        next(error);
    }
};
