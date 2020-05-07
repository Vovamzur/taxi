import { Router } from 'express';

import * as driverService from './../services/driver.service';
import * as driverValidations from '../middlewares/validations/driver.validation.middlewar'

const router: Router = Router();

router.get('/:id', driverValidations.getByID, (req, res, next) =>
  driverService.getDrivertById(req.params.id, next)
    .then(data => res.send(data))
    .catch(next)
)
  .post('/', driverValidations.postDriver, (req, res, next) =>
    driverService.createDriver(req.body, next)
      .then(data => res.send(data))
      .catch(next)
  )
  .put('/:id', driverValidations.updateDriver, (req, res, next) =>
    driverService.updateDriver(req.params.id, req.body, next)
      .then(data => res.send(data))
      .catch(next)
  );

export default router;
