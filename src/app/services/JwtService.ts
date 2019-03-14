import fs from 'fs';
import jwt from 'jsonwebtoken';

const privateKey = fs.readFileSync('private.key', 'utf8');
const publicKey = fs.readFileSync('public.key', 'utf8');
const options: any = {
    expiresIn: "1h",
    algorithm: "RS256"
};

export default {
    sign(payload: any) {
        return jwt.sign(payload, privateKey, options);
    },

    verify(token: string) {
        try {
            return jwt.verify(token, publicKey, options);
        } catch (err) {
            return false;
        }
    },

    decode(token: string) {
        return jwt.decode(token, {
            complete: true
        });
    }
}