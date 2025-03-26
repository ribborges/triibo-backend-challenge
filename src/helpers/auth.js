import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import { secret } from '#root/config/env.js';

const random = () => crypto.randomBytes(128).toString('base64');

const hashPassword = (password, salt) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(secret).digest('hex');
}

const genToken = (id) => {
    return jwt.sign({ id }, secret, {
        expiresIn: "30d",
    });
};

const verifyToken = (token) => {
    return jwt.verify(token, secret);
}

export { random, hashPassword, genToken, verifyToken };