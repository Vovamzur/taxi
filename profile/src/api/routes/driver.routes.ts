import { Router } from 'express';

import * as driverService from './../services/driver.service';

const router: Router = Router();

router.get('/:id', (req, res, next) =>
  driverService.getDrivertById(req.params.id, next)
    .then(data => res.send(data))
    .catch(next)
  )
  .post('/', (req, res, next) =>
    driverService.createDriver(req.body, next)
      .then(data => res.send(data))
      .catch(next)
  )
  .put('/:id', (req, res, next) =>
    driverService.updateDriver(req.params.id, req.body, next)
      .then(data => res.send(data))
      .catch(next)
  );

export default router;
