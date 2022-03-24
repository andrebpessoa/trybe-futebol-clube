import { Router } from 'express';
import { createUserController } from '../useCases/CreateUserUseCase';

const userRouter = Router();

userRouter.post('/users', async (req, res) => createUserController.handle(req, res));

export default userRouter;
