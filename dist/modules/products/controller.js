"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsController = void 0;
const repository_1 = require("./repository");
class ProductsController {
    constructor() {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield repository_1.productsRepository.create(req.body);
            if (response.ok) {
                res.send({
                    product: response.data
                });
            }
            else {
                res.status(400).json({
                    message: response.data
                });
            }
        });
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield repository_1.productsRepository.getAll();
            if (response.ok) {
                res.send({
                    products: response.data
                });
            }
            else {
                res.status(400).json({
                    message: response.data
                });
            }
        });
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield repository_1.productsRepository.getById(req.params.id);
            if (response.ok) {
                res.send({
                    product: response.data
                });
            }
            else {
                res.status(400).json({
                    message: response.data
                });
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield repository_1.productsRepository.update(req.params.id, req.body);
            if (response.ok) {
                res.send({
                    product: response.data
                });
            }
            else {
                res.status(400).json({
                    message: response.data
                });
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield repository_1.productsRepository.delete(req.params.id);
            if (response.ok) {
                res.send({
                    message: 'product deleted successfully'
                });
            }
            else {
                res.status(400).json({
                    message: response.data
                });
            }
        });
    }
}
exports.productsController = new ProductsController;
//# sourceMappingURL=controller.js.map