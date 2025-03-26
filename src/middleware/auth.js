import { verifyToken } from '#root/helpers/auth.js';

async function isAuth(req, res, next) {
    try {
        const token = req.cookies['token'];

        if (!token) return res.status(401).json({ status: 'Unauthorized' });

        const decoded = verifyToken(token);

        if (!decoded) return res.status(401).json({ status: 'Unauthorized' });

        const id = decoded.id;

        req = { ...req, authenticatedUser: id };

        next();
    } catch (error) {
        return res.status(500).json({ status: 'Internal server error' });
    }
}

export { isAuth };