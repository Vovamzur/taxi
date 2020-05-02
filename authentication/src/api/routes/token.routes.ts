import { Router } from 'express';

import * as tokenService from './../services/token.service';
const router: Router = Router();

router
  .post('/verify', (req, res, next) => {
    const { token } = req.body;
    if (!token) return res.status(401).end();
    tokenService.veriFyToken(token)
      .then((isValid: boolean) => res.status(isValid ? 200 : 403).end())
      .catch(next);
  });

export default router;
