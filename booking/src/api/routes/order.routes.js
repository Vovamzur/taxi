import { Router } from 'express';

import * as orderService from '../services/order.service';

const router = Router();

router
  .post('/new-order', (req, res, next) =>
    orderService.newOrder(req.body, req.io)
      .then(data => res.send(data))
      .catch(next),
  )
  .post('/accept-order', (req, res, next) =>
    orderService.acceptOrder(req.body, req.io)
      .then(data => res.send(data))
      .catch(next)
  )
  .post('/start-order', (req, res, next) =>
    orderService.startOrder(req.body, req.io)
      .then(data => res.send(data))
        .catch(next)
  )
  .post('/cancel-order', (req, res, next) =>
    orderService.cancelOrder(req.body, req.io)
      .then(data => res.send(data))
      .catch(next)
  )
  .post('/finish-order', (req, res, next) =>
    orderService.finishOrder(req.body, req.io)
      .then(data => res.send(data))
      .catch(next)
  )

export default router;