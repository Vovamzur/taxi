import { Router } from 'express';

import * as userService from '../services/user.service';
import * as userValidation from './../middlewares/validation/user.validation';

const router: Router = Router();

router
  .get('/:id', userValidation.getUserById, (req, res, next) =>
    userService.getUserById(parseInt(req.params.id, 10), next)
      .then((data: any) => res.json(data))
      .catch(next),
  )
  .put('/update/:id', userValidation.updateUser, (req, res, next) =>
    userService.updateUserByID(parseInt(req.params.id, 10), req.body, next)
      .then(data => res.send(data))
      .catch(next),
  );

export default router;
