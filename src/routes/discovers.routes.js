import { Router } from 'express';

import {
  create,
  getSingle,
  getMultiple,
  update,
  remove,
} from '../controllers/discovers/discovers.controllers.js';

const discoversRoutes = Router();

discoversRoutes.post('/', create);
discoversRoutes.get('/:id', getSingle);
discoversRoutes.get('/', getMultiple);
discoversRoutes.put('/:id', update);
discoversRoutes.delete('/:id', remove);

export default discoversRoutes;
