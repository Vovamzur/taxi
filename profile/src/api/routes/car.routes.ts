import { Router } from 'express';

import * as carService from './../services/car.service';

const router: Router = Router();

router
  .get('/:id', (req, res, next) =>
    carService.getCarById(req.params.id, next)
      .then(data => res.send(data))
      .catch(next),
  )
  .post('/', (req, res, next) =>
    carService.createCar(req.body, next)
      .then(data => res.send(data))
      .catch(next)
  )
  .put('/:id', (req, res, next) =>
    carService.updateCar(req.params.id, req.body, next)
      .then(data => res.send(data))
      .catch(next)
  );


export default router;

