import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import { loginController } from '../useCases/LoginUseCase';

const loginRouter = Router();

loginRouter.post('/login', async (req, res) => loginController.handle(req, res));
loginRouter.get('/login/validate', authMiddleware);

export default loginRouter;
