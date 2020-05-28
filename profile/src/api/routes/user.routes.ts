import { Router } from 'express';

import * as userService from './../services/user.service';

const router: Router = Router();

router
  .put('/:id', (req, res, next) =>
    userService.updateUser(req.params.id, req.body, next)
      .then(data => res.send(data))
      .catch(next)
  );

export default router;
