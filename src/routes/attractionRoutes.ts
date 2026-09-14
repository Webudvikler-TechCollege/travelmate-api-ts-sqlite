import { Router } from 'express';
import { attractionController } from '../controllers/attractionController.js';

const routes = Router();
routes.get('/', attractionController.getRecords);
routes.get('/:id', attractionController.getRecord);

export const attractionRoutes = routes;