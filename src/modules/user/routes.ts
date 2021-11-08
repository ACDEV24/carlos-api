import { Router } from 'express';
import { userController } from './controller';
import { authController } from '../../utils/auth';

const router: Router = Router();

router.post('/', userController.signup);
router.post('/login', userController.login);
router.get('/me', [authController.validateUserToken], userController.me);
router.put('/:id', [authController.validateUserToken], userController.update);
router.delete('/:id', [authController.validateUserToken], userController.delete);

// ADMIN

router.patch('/:id', [authController.validateAdminToken], userController.updateStatus);
router.get('/', [authController.validateAdminToken], userController.getAll);
router.get('/:id', [authController.validateAdminToken], userController.getById);

export default router;
