"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const auth_1 = require("../../utils/auth");
const router = express_1.Router();
router.post('/', controller_1.adminController.signup);
router.post('/login', controller_1.adminController.login);
router.get('/', [auth_1.authController.validateAdminToken], controller_1.adminController.getAll);
router.get('/me', [auth_1.authController.validateAdminToken], controller_1.adminController.me);
router.get('/:id', [auth_1.authController.validateAdminToken], controller_1.adminController.getById);
router.put('/:id', [auth_1.authController.validateAdminToken], controller_1.adminController.update);
router.delete('/:id', [auth_1.authController.validateAdminToken], controller_1.adminController.delete);
exports.default = router;
//# sourceMappingURL=routes.js.map