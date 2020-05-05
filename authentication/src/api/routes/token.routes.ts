import { Router } from 'express';

import * as tokenService from './../services/token.service';
const router: Router = Router();

router
  .post('/verify', (req, res, next) => {
    const { token } = req.body;
    if (!token) return res.json(401);
    tokenService.veriFyToken(token)
      .then((isValid: boolean) => res.json(isValid ? 200 : 403))
      .catch(next);
  });

export default router;
