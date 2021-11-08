"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const auth_1 = require("../../utils/auth");
const router = express_1.Router();
router.get('/', [auth_1.authController.validateUserToken], controller_1.productsController.getAll);
router.get('/:id', [auth_1.authController.validateUserToken], controller_1.productsController.getById);
// router.post('/', productsController.create);
// router.put('/:id', productsController.update);
// ADMIN
router.put('/:id', [auth_1.authController.validateAdminToken], controller_1.productsController.update);
router.post('/', [auth_1.authController.validateAdminToken], controller_1.productsController.create);
router.delete('/:id', [auth_1.authController.validateAdminToken], controller_1.productsController.delete);
exports.default = router;
//# sourceMappingURL=routes.js.map