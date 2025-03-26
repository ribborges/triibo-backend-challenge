import { nodeEnv } from './env.js';

const cookieOpt = {
    path: '/',
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    sameSite: "none",
    secure: nodeEnv === 'production'
}

const clearCookieOpt = {
    path: '/',
    httpOnly: true,
    sameSite: "none",
    secure: nodeEnv === 'production'
}

export { cookieOpt, clearCookieOpt };