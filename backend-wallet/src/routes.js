import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import WalletController from './app/controllers/WalletController';
import TransactionController from './app/controllers/TransactionController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.post('/wallet', WalletController.store);
routes.get('/wallet', WalletController.index);
routes.put('/wallet/:id', WalletController.update);
routes.delete('/wallet/:id', WalletController.delete);

routes.put('/users', UserController.update);

routes.get('/transaction/:id', TransactionController.show);
routes.post('/transaction/:id', TransactionController.store);
routes.delete('/transaction/:id', TransactionController.delete);

export default routes;
