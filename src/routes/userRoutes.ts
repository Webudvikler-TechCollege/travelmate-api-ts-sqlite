import { Router } from 'express';
import { userController } from '../controllers/userController.js';
import { authController } from '../controllers/authController.js';

const router = Router();
router.get('/', userController.getRecords);
router.get('/:id', userController.getRecord);
router.post('/', authController.authorize, userController.createRecord);
router.put('/:id', authController.authorize, userController.updateRecord);
router.delete('/:id', authController.authorize, userController.deleteRecord);

export const userRoutes = router;
