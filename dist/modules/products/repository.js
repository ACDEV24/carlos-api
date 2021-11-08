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
exports.productsRepository = void 0;
const database_1 = require("../../database/database");
class ProductsRepository {
    constructor() {
        this.table = 'products';
        this.atributes = `(
        name,
        price,
        image,
        stock,
        description,
        atributes
    )`;
        this.create = (product) => __awaiter(this, void 0, void 0, function* () {
            const query = `insert into ${this.table}${this.atributes} values(
            '${product.name}',
            ${product.price},
            '${product.image}',
            ${product.stock},
            '${product.description}',
            '${JSON.stringify(product.atributes || {})}'
        ) RETURNING *`;
            return database_1.database.query(query)
                .then((value) => {
                return {
                    ok: true,
                    data: value[0],
                };
            })
                .catch((err) => {
                console.log(err.message);
                return {
                    ok: false,
                    data: err.message
                };
            });
        });
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            return database_1.database.query(`SELECT * FROM ${this.table} WHERE active = true`).then((value) => {
                return {
                    ok: true,
                    data: value,
                };
            }).catch((err) => {
                console.log(err.message);
                return {
                    ok: false,
                    data: err.message
                };
            });
        });
        this.getById = (id) => __awaiter(this, void 0, void 0, function* () {
            return database_1.database.query(`SELECT * FROM ${this.table} WHERE id = '${id}'`).then((value) => {
                if (!value)
                    return {
                        ok: false,
                        data: 'product not found'
                    };
                else
                    return {
                        ok: true,
                        data: value[0],
                    };
            }).catch((err) => {
                console.log(err.message);
                return {
                    ok: false,
                    data: err.message
                };
            });
        });
        this.update = (id, product) => __awaiter(this, void 0, void 0, function* () {
            return database_1.database.query(`UPDATE ${this.table} SET
            name = '${product.name}',
            price = ${product.price},
            image = '${product.image}',
            stock = ${product.stock},
            description = '${product.description}',
            atributes = '${JSON.stringify(product.atributes || {})}'
            WHERE id = '${id}'`).then((value) => __awaiter(this, void 0, void 0, function* () {
                if (!value)
                    return {
                        ok: false,
                        data: 'product not found'
                    };
                const product = yield this.getById(id);
                if (!product.ok)
                    return product;
                return {
                    ok: true,
                    data: product.data,
                };
            })).catch((err) => {
                console.log(err.message);
                return {
                    ok: false,
                    data: err.message
                };
            });
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            return database_1.database.query(`delete from ${this.table} WHERE id = '${id}'`).then((value) => {
                if (!value)
                    return {
                        ok: false,
                        data: 'product not found'
                    };
                else
                    return {
                        ok: true,
                        data: value,
                    };
            }).catch((err) => {
                console.log(err.message);
                return {
                    ok: false,
                    data: err.message
                };
            });
        });
    }
}
exports.productsRepository = new ProductsRepository;
//# sourceMappingURL=repository.js.map