import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';

import authMiddleware from './app/middlewares/auth';
import isAdmin from './app/middlewares/isAdmin';

const routes = new Router();

routes.post('/users', UserController.store); // Criar usuario
routes.post('/sessions', SessionController.store); // Login

routes.use(authMiddleware); // Só vale para as rotas que vem após essa linha

routes.put('/users', UserController.update); // Atualizar usuario

routes.post('/recipients', isAdmin, RecipientController.store); // Cadastra destinatário

routes.get('/teste', isAdmin);

export default routes;
