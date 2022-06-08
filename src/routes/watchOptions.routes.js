import { Router } from 'express';

import {
  create,
  getSingle,
  getMultiple,
  update,
  remove,
} from '../controllers/watchOptions.controllers.js';

const wathcOptionsRoutes = Router();

wathcOptionsRoutes.post('/', create);
wathcOptionsRoutes.get('/:id', getSingle);
wathcOptionsRoutes.get('/', getMultiple);
wathcOptionsRoutes.put('/:id', update);
wathcOptionsRoutes.delete('/:id', remove);

export default wathcOptionsRoutes;
