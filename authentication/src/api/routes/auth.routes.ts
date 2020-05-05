import { Router } from 'express';
import { User } from '@prisma/client';

import * as userService from '../services/user.service';
import * as authService from '../services/auth.service';
import loginMiddleware from '../middlewares/login.middleware';
import registrationMiddleware from '../middlewares/registration.middleware';

const router: Router = Router();

router
  .post('/login', loginMiddleware, (req, res, next) =>
    authService
      .login(req.user as User)
      .then((data: any) => res.send(data))
      .catch(next),
  )
  .post('/registration', registrationMiddleware, (req, res, next) =>
    authService
      .register(req.user as User)
      .then((data: any) => res.send(data))
      .catch(next),
  )
  .get('/user', (req, res, next) =>
    userService
      .getUserById((req.user as User).id, next)
      .then((data: any) => res.send(data))
      .catch(next),
  );

export default router;
