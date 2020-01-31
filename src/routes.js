import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DistributorController from './app/controllers/DistributorController';

import authMiddleware from './app/middlewares/auth';
import isAdmin from './app/middlewares/isAdmin';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store); // Criar usuario
routes.post('/sessions', SessionController.store); // Login

routes.use(authMiddleware); // Só vale para as rotas que vem após essa linha

routes.put('/users', UserController.update); // Atualizar usuario

routes.post('/recipients', isAdmin, RecipientController.store); // Cadastra destinatário

routes.post('/distributors', isAdmin, DistributorController.store);

routes.get('/teste', isAdmin);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
