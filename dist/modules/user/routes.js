"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const auth_1 = require("../../utils/auth");
const router = express_1.Router();
router.post('/', controller_1.userController.signup);
router.post('/login', controller_1.userController.login);
router.get('/me', [auth_1.authController.validateUserToken], controller_1.userController.me);
router.put('/:id', [auth_1.authController.validateUserToken], controller_1.userController.update);
router.delete('/:id', [auth_1.authController.validateUserToken], controller_1.userController.delete);
// ADMIN
router.patch('/:id', [auth_1.authController.validateAdminToken], controller_1.userController.updateStatus);
router.get('/', [auth_1.authController.validateAdminToken], controller_1.userController.getAll);
router.get('/:id', [auth_1.authController.validateAdminToken], controller_1.userController.getById);
exports.default = router;
//# sourceMappingURL=routes.js.map