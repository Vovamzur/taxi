import { Router } from 'express';

import * as orderService from '../services/order.service';

const router = Router();

router
  .post('/new-order', (req, res, next) =>
    orderService.newOrder(req.body)
      .then(data => res.send(data))
      .catch(next),
  )

export default router;