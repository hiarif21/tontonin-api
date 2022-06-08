import { Router } from 'express';

import {
  create,
  getSingle,
  getMultiple,
  update,
  remove,
} from '../controllers/persons.controllers.js';

const personsRoutes = Router();

personsRoutes.post('/', create);
personsRoutes.get('/:id', getSingle);
personsRoutes.get('/', getMultiple);
personsRoutes.put('/:id', update);
personsRoutes.delete('/:id', remove);

export default personsRoutes;
