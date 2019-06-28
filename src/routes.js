import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// Criar usuário
routes.post('/users', UserController.store);

// Sessão do usuário
routes.post('/sessions', SessionController.store);

// Middleware global que verificará se o usuário está logado
routes.use(authMiddleware);

// Editar usuário
routes.put('/users', UserController.update);

export default routes;
