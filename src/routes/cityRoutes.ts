import { Router } from 'express';
import { cityController } from '../controllers/cityController.js';

const routes = Router();
routes.get('/', cityController.getRecords);
routes.get('/:id', cityController.getRecord);

export const cityRoutes = routes;