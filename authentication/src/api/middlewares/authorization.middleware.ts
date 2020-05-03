import { Request, Response, NextFunction } from 'express';
import jwtMiddleware from './jwt.middleware';

export default (routesWhiteList: string[]) => (req: Request, res: Response, next: NextFunction) => (
  routesWhiteList.some(route => route === req.path)
    ? next()
    : jwtMiddleware(req, res, next)
);
