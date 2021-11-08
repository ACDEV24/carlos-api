"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const util_1 = __importDefault(require("util"));
const mysql_1 = __importDefault(require("mysql"));
function makeDb(config) {
    console.info('process.env.DB_PASSWORD was ' + process.env.MYSQL_PASSWORD + ' set');
    const connection = mysql_1.default.createConnection(config);
    return {
        query(sql) {
            return util_1.default.promisify(connection.query).call(connection, sql);
        },
        close() {
            return util_1.default.promisify(connection.end).call(connection);
        }
    };
}
exports.database = makeDb({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: 3306,
    database: process.env.MYSQL_DATABASE,
    insecureAuth: true,
});
//# sourceMappingURL=database.js.map