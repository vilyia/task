import { Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AuthRequest from '../interfaces/AuthReqest';
import config from '../config/index';

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;

        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
            return res.status(401).json({ message: 'Token expired' });
        }

        req.email = decoded.email;

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};
