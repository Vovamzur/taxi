import dotenv from 'dotenv';

dotenv.config();

export const secret: string = process.env.SECRET_KEY;
export const expiresIn: string = '24h';
