import { Router } from 'express';

import {
  create,
  getSingle,
  getMultiple,
  update,
  remove,
} from '../controllers/movies.controllers.js';

const moviesRoutes = Router();

moviesRoutes.post('/', create);
moviesRoutes.get('/:id', getSingle);
moviesRoutes.get('/', getMultiple);
moviesRoutes.put('/:id', update);
moviesRoutes.delete('/:id', remove);

export default moviesRoutes;
