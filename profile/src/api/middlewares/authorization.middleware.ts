import { RequestHandler} from 'express'
import * as authService from './../../externalApi/authService';

const authorizationMiddleware: RequestHandler = async (req, res, next) => {
  const authHeader = req.headers.authorization as string;
  const { statusCode, error } = await authService.verifyToken(authHeader);
  if (error) return next(error);
  if (statusCode === 200) return next();
  res.sendStatus(statusCode as number);
}

export default authorizationMiddleware;