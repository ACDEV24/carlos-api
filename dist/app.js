"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./modules/user/routes"));
const routes_2 = __importDefault(require("./modules/admin/routes"));
const routes_3 = __importDefault(require("./modules/products/routes"));
const path_1 = __importDefault(require("path"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
exports.server = http_1.default.createServer(app);
const publicPath = path_1.default.resolve(__dirname, '../public');
app.use('/', express_1.default.static(publicPath));
app.set('port', process.env.PORT || 3004);
// Middelwares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cors_1.default());
// Routes
const swaggerDocument = require('../swagger.json');
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use('/api/users', routes_1.default);
app.use('/api/products', routes_3.default);
app.use('/api/admins', routes_2.default);
exports.default = app;
//# sourceMappingURL=app.js.map