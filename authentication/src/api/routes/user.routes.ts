import { Router } from 'express';

import * as userService from '../services/user.service';
import jwtMiddleware from '../middlewares/jwt.middleware';
import userSchema from './../../validations/user.schema';

const router: Router = Router();

router
  .get('/:id', jwtMiddleware, (req, res, next) =>
    userService.getUserById(parseInt(req.params.id, 10))
      .then((data: any) => res.json(data))
      .catch(next),
  )
  .put('/update/:id', jwtMiddleware, async (req, res, next) => {
    const user = req.body;
    const userID = parseInt(req.params.id, 10);
    try {
      await userSchema.validate(user, { strict: true });
    } catch ({ errors }) {
      const message = `Invalid body: ${Object.values(errors).join('\n')}`;
      return res.status(400).end(message);
    }
    try {
      const userFromDb = await userService.getUserById(userID);
      if (!userFromDb) {
        res.status(400).end(`There is no user with such id ${userID}`);
      }
      const updatedUser = await userService.updateUserByID(userID, user);
      res.json(updatedUser);
    } catch (err) {
      next(err);
    }
  });

export default router;
