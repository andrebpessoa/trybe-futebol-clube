import { Router } from 'express';
import { findClubByIdController } from '../useCases/FindClubByIdUseCase';
import { findAllClubsController } from '../useCases/FindAllClubsUseCase';

const clubsRouter = Router();

clubsRouter.get('/clubs', async (req, res) => findAllClubsController.handle(req, res));
clubsRouter.get('/clubs/:id', async (req, res) => findClubByIdController.handle(req, res));

export default clubsRouter;
