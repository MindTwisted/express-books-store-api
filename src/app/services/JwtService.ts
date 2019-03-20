import fs from 'fs';
import jwt from 'jsonwebtoken';

const privateKey = fs.readFileSync('private.key', 'utf8');
const publicKey = fs.readFileSync('public.key', 'utf8');
const options: any = {
    expiresIn: '1h',
    algorithm: 'RS256',
};

class JwtService {
    public sign(payload: any) {
        return jwt.sign(payload, privateKey, options);
    }

    public verify(token: string) {
        try {
            return jwt.verify(token, publicKey, options);
        } catch (err) {
            return false;
        }
    }

    public decode(token: string) {
        return jwt.decode(token, {
            complete: true,
        });
    }
}

export default new JwtService();
