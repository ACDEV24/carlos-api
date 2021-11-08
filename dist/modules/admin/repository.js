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
exports.adminsRepository = void 0;
const database_1 = require("../../database/database");
class AdminsRepository {
    constructor() {
        this.table = 'users';
        this.signup = (user) => __awaiter(this, void 0, void 0, function* () {
            return database_1.database.query(`insert into ${this.table}(first_name, last_name, email, password, role) values('${user.first_name}', '${user.last_name}', '${user.email}', '${user.password}', 1) RETURNING *`)
                .then((value) => {
                return {
                    ok: true,
                    data: value[0]
                };
            })
                .catch((err) => {
                return {
                    ok: false,
                    data: err.message
                };
            });
        });
        this.login = (email) => __awaiter(this, void 0, void 0, function* () {
            return database_1.database.query(`SELECT * FROM ${this.table} WHERE email = '${email}' AND role = 1`).then((value) => {
                console.log(value);
                if (!value)
                    return {
                        ok: false,
                        data: 'email or password does\'not match'
                    };
                return {
                    ok: true,
                    data: value[0],
                };
            }).catch((err) => {
                return {
                    ok: false,
                    data: err.message
                };
            });
        });
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            return database_1.database.query(`SELECT * FROM ${this.table} WHERE role = 1`).then((value) => {
                return {
                    ok: true,
                    data: value,
                };
            }).catch((err) => {
                return {
                    ok: false,
                    data: err.message,
                };
            });
        });
        this.getById = (id) => __awaiter(this, void 0, void 0, function* () {
            return database_1.database.query(`SELECT * FROM ${this.table} WHERE id = '${id}' AND role = 1`).then((value) => {
                if (!value)
                    return {
                        ok: false,
                        data: 'user not found'
                    };
                else
                    return {
                        ok: true,
                        data: value[0],
                    };
            }).catch((err) => {
                return {
                    ok: false,
                    data: err.message
                };
            });
        });
        this.update = (id, user) => __awaiter(this, void 0, void 0, function* () {
            return database_1.database.query(`UPDATE ${this.table} SET
                first_name = '${user.first_name}',
                last_name = '${user.last_name}',
                email = '${user.email}'
             WHERE id = '${id}' AND role = 1`).then((value) => __awaiter(this, void 0, void 0, function* () {
                console.log(value);
                if (!value)
                    return {
                        ok: false,
                        data: 'user not found'
                    };
                const user = yield this.getById(id);
                if (!user.ok)
                    return user;
                return {
                    ok: true,
                    data: user.data
                };
            })).catch((err) => {
                return {
                    ok: false,
                    data: err.message
                };
            });
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            return database_1.database.query(`delete from ${this.table} WHERE id = '${id}' AND role = 1`).then((value) => {
                if (!value)
                    return {
                        ok: false,
                        data: 'user not found'
                    };
                else
                    return {
                        ok: true,
                        data: value[0],
                    };
            }).catch((err) => {
                return {
                    ok: false,
                    data: err.message
                };
            });
        });
    }
}
exports.adminsRepository = new AdminsRepository;
//# sourceMappingURL=repository.js.map