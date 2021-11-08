import express, { Application } from 'express';
import usersRoutes from './modules/user/routes';
import adminRoutes from './modules/admin/routes';
import productsRoutes from './modules/products/routes';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import http from 'http';
import cors from 'cors';

const app: Application = express();

export let server: http.Server = http.createServer(app);

const publicPath: string = path.resolve(__dirname, '../public');

app.use('/', express.static(publicPath));

app.set('port', process.env.PORT || 3004);

// Middelwares

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes

const swaggerDocument: any = require('../swagger.json');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/users', usersRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/admins', adminRoutes);

export default app;
