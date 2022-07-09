import { Router } from 'express';

import {
  create,
  getSingle,
  getMultiple,
  update,
  remove,
} from '../controllers/discovers/discovers.controllers.js';
import {
  mostPopular,
  newRelease,
} from '../controllers/discovers/moreDiscovers.controllers.js';

const discoversRoutes = Router();

discoversRoutes.get('/popular', mostPopular);
discoversRoutes.get('/new', newRelease);

discoversRoutes.post('/', create);
discoversRoutes.get('/:id', getSingle);
discoversRoutes.get('/', getMultiple);
discoversRoutes.put('/:id', update);
discoversRoutes.delete('/:id', remove);

export default discoversRoutes;
