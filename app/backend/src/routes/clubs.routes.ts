import { Router } from 'express';
import { findClubsController } from '../useCases/FindClubsUseCase';

const clubsRouter = Router();

clubsRouter.get('/clubs', async (req, res) => findClubsController.handle(req, res));
clubsRouter.get('/clubs/:id', async (req, res) => findClubsController.handle(req, res));

export default clubsRouter;
