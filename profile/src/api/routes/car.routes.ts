import { Router } from 'express';

import * as carService from './../services/car.service';
import * as carValidation from './../middlewares/validations/car.validation.middleware';

const router: Router = Router();

router
  .get('/:id', carValidation.getByID, (req, res, next) =>
    carService.getCarById(req.params.id, next)
      .then(data => res.send(data))
      .catch(next),
  )
  .post('/', carValidation.postCar, (req, res, next) =>
    carService.createCar(req.body, next)
      .then(data => res.send(data))
      .catch(next)
  )
  .put('/:id', carValidation.updateCar, (req, res, next) =>
    carService.updateCar(req.params.id, req.body, next)
      .then(data => res.send(data))
      .catch(next)
  );

export default router;
