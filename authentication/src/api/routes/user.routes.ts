import { Router } from 'express';

import * as userService from '../services/user.service';
import userSchema from './../../validations/user.schema';

const router: Router = Router();

router
  .get('/:id', (req, res, next) =>
    userService.getUserById(parseInt(req.params.id, 10), next)
      .then((data: any) => res.json(data))
      .catch(next),
  )
  .put('/update/:id', async (req, res, next) => {
    const user = req.body;
    const userID = parseInt(req.params.id, 10);
    try {
      await userSchema.validate(user, { strict: true });
    } catch ({ errors }) {
      const message = `Invalid body: ${Object.values(errors).join('\n')}`;
      return res.status(400).end(message);
    }
    try {
      const userFromDb = await userService.getUserById(userID, next);
      if (!userFromDb) {
        return next({ status: 400, message: `There is no user with such id ${userID}` });
      }
      const updatedUser = await userService.updateUserByID(userID, user, next);
      res.json(updatedUser);
    } catch (err) {
      next(err);
    }
  });

export default router;
