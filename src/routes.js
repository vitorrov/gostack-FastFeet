import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DistributorController from './app/controllers/DistributorController';
import OrderController from './app/controllers/OrderController';

import authMiddleware from './app/middlewares/auth';
import isAdmin from './app/middlewares/isAdmin';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store); // Criar usuario
routes.post('/sessions', SessionController.store); // Login

routes.use(authMiddleware); // Só vale para as rotas que vem após essa linha

routes.put('/users', UserController.update); // Atualizar usuario

routes.post('/recipients', isAdmin, RecipientController.store); // Cadastra destinatário

routes.post('/distributors', isAdmin, DistributorController.store); // Cadastra entregador
routes.get('/distributors', isAdmin, DistributorController.index); // Listar todos entregadores
routes.put('/distributors/:id', isAdmin, DistributorController.update); // Atualizar entregador
routes.delete('/distributors/:id', isAdmin, DistributorController.destroy); // Remover entregador

routes.post('/orders', isAdmin, OrderController.store); // Cadastrar nova entrega
routes.get('/orders', isAdmin, OrderController.index); // Lista todas entregas
routes.put('/orders/:id', isAdmin, OrderController.update); // Atualizar dados entrega
routes.delete('/orders/:id', isAdmin, OrderController.destroy); // Remover entrega

routes.get('/teste', isAdmin);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
