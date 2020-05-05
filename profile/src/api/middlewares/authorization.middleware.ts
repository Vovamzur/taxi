import { RequestHandler} from 'express'
import * as authService from './../../externalApi/authService';

const authorizationMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization as string;
    const statusCode = await authService.verifyToken(authHeader, next);
    if (statusCode === undefined) return
    if (statusCode === 200) { return next(); }
    res.status(statusCode).end();
  } catch (err) {
    res.status(500).end();
  }
}

export default authorizationMiddleware;