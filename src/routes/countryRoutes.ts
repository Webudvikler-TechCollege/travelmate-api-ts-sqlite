import { Router } from 'express';
import { countryController } from '../controllers/countryController.js';

const routes = Router();
routes.get('/', countryController.getRecords);
routes.get('/:id', countryController.getRecord);

export const countryRoutes = routes;