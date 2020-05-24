import { Router } from 'express';
import { User } from '../../types/user.type';

import * as userService from '../services/user.service';
import * as authService from '../services/auth.service';
import loginMiddleware from '../middlewares/login.middleware';
import registrationMiddleware from '../middlewares/registration.middleware';
import * as authValidations from '../middlewares/validation/auth.validation'
import jwtMiddleware from '../middlewares/jwt.middleware';

const router: Router = Router();

router
  .post('/login', authValidations.login, loginMiddleware, (req, res, next) =>
    authService
      .login(req.user as User, next)
      .then((data: any) => res.send(data))
      .catch(next),
  )
  .post('/registration', authValidations.registration, registrationMiddleware, (req, res, next) =>
    authService
      .register(req.user as User, next)
      .then((data: any) => res.send(data))
      .catch(next),
  )
  .get('/user', jwtMiddleware, (req, res, next) =>
    userService
      .getUserById((req.user as User).id, next)
      .then((data: any) => res.send(data))
      .catch(next),
  );

export default router;
