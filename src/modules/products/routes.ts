import { Router } from 'express';
import { productsController } from './controller';
import { authController } from '../../utils/auth';

const router: Router = Router();

router.get('/', [authController.validateUserToken], productsController.getAll);
router.get('/:id', [authController.validateUserToken], productsController.getById);

// router.post('/', productsController.create);
// router.put('/:id', productsController.update);

// ADMIN

router.put('/:id', [authController.validateAdminToken], productsController.update);
router.post('/', [authController.validateAdminToken], productsController.create);
router.delete('/:id', [authController.validateAdminToken], productsController.delete);

export default router;
