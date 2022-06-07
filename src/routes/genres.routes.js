import { Router } from 'express';

import {
  create,
  getSingle,
  getMultiple,
  update,
  remove,
} from '../controllers/genres.controllers.js';

const genresRoutes = Router();

genresRoutes.post('/', create);
genresRoutes.get('/:id', getSingle);
genresRoutes.get('/', getMultiple);
genresRoutes.put('/:id', update);
genresRoutes.delete('/:id', remove);

export default genresRoutes;
