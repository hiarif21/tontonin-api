import { Router } from 'express';

import {
  create,
  getSingle,
  getMultiple,
  update,
  remove,
} from '../controllers/roles.controllers.js';

const rolesRoutes = Router();

rolesRoutes.post('/', create);
rolesRoutes.get('/:id', getSingle);
rolesRoutes.get('/', getMultiple);
rolesRoutes.put('/:id', update);
rolesRoutes.delete('/:id', remove);

export default rolesRoutes;
