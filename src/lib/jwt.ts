import jwt from 'jsonwebtoken';

if (!process.env.JWT_SECRET) {
    throw new Error('Invalid environment variable: "JWT_SECRET" ')
}

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (payload: any) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' });
};

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}