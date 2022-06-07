import { Router } from 'express';

import {
  create,
  getSingle,
  getMultiple,
  update,
  remove,
} from '../controllers/streamingServices.controllers.js';

const streamingServicesRoutes = Router();

streamingServicesRoutes.post('/', create);
streamingServicesRoutes.get('/:id', getSingle);
streamingServicesRoutes.get('/', getMultiple);
streamingServicesRoutes.put('/:id', update);
streamingServicesRoutes.delete('/:id', remove);

export default streamingServicesRoutes;
