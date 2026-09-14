import { Router } from 'express';
import { languageController } from '../controllers/languageController.js';

const routes = Router();
routes.get('/', languageController.getRecords);

export const languageRoutes = routes;