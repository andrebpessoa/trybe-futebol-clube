import { Router } from 'express';

import authMiddleware from '../middlewares/auth.middleware';
import { loginController } from '../useCases/LoginUseCase';

const loginRouter = Router();

loginRouter.post(
  '/login',
  async (req, res) => loginController.handle(req, res),
);

loginRouter.get(
  '/login/validate',
  authMiddleware,
  async (req, res) => res.status(200).json(req.tokenPayload.role),
);

export default loginRouter;
