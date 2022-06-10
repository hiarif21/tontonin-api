import { Router } from 'express';

import { get } from '../controllers/dashboard.controllers.js';

const genresRoutes = Router();

genresRoutes.get('/', get);

export default genresRoutes;
