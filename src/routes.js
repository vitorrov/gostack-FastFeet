import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store); // Criar usuario
routes.post('/sessions', SessionController.store); // Login

routes.use(authMiddleware); // Só vale para as rotas que vem após essa linha

routes.put('/users', UserController.update); // Atualizar

export default routes;
