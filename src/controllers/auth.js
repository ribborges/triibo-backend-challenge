import { cookieOpt, clearCookieOpt } from '#root/config/cookie.js';
import { db } from '#root/database/index.js';
import { random, hashPassword, genToken } from '#root/helpers/auth.js';

const collectionName = 'users';

async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ status: 'Bad request' });

        const snapshot = db.collection(collectionName).where('email', '==', email);
        const result = await snapshot.get();

        if (result.empty) return res.status(404).json({ status: 'User not found' });

        const expectedHash = hashPassword(password, result.docs[0].data().auth.salt);

        if (expectedHash !== result.docs[0].data().auth.password) return res.status(401).json({ status: 'Unauthorized' });

        const token = genToken(result.docs[0].id);

        res.cookie('token', token, cookieOpt);

        // Return the user data
        res.status(200).json({ status: 'Login successful', id: result.docs[0].id });
    } catch (error) {
        res.status(500).send('Internal server error');
    }
}

async function register(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ status: 'Bad request' });

        if (password.length < 8) return res.status(400).json({ status: 'Password must be at least 8 characters long' });

        if (!email.includes('@')) return res.status(400).json({ status: 'Invalid email' });

        const emailSnapshot = db.collection(collectionName).where('email', '==', email);
        const emailResult = await emailSnapshot.get();

        if (!emailResult.empty) return res.status(400).json({ status: 'Email already exists' });

        const snapshot = db.collection(collectionName);

        const salt = random();

        const user = {
            email,
            auth: {
                password: hashPassword(password, salt),
                salt
            }
        };

        const result = await snapshot.add(user);

        if (!result) return res.status(500).json({ status: 'Internal server error' });

        const token = genToken(result.id);

        res.cookie('token', token, cookieOpt);

        // Return the ID of the newly created user
        res.status(201).json({ status: 'New user added successfully', id: result.id });
    } catch (error) {
        res.status(500).send('Internal server error');
    }
}

async function logout(req, res) {
    try {
        res.clearCookie('token', clearCookieOpt);
        res.status(200).json({ status: 'Logout successful' });
    } catch (error) {
        res.status(500).send('Internal server error');
    }
}

export { login, register, logout };