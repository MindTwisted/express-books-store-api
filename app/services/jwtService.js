const fs = require('fs');
const jwt = require('jsonwebtoken');

const privateKey = fs.readFileSync('private.key', 'utf8');
const publicKey = fs.readFileSync('public.key', 'utf8');

module.exports = {
    sign(payload) {
        return jwt.sign(payload, privateKey, {
            expiresIn: "1h",
            algorithm: "RS256"
        });
    },

    verify(token) {
        try {
            return jwt.verify(token, publicKey, {
                expiresIn: "1h",
                algorithm: "RS256"
            });
        } catch (err) {
            return false;
        }
    },

    decode(token) {
        return jwt.decode(token, {
            complete: true
        });
    }
}