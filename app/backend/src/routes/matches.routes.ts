import { Router } from 'express';
import { findMatchesController } from '../useCases/FindMatchesUseCase';

const matchesRouter = Router();

matchesRouter.get('/matchs', async (req, res) => findMatchesController.handle(req, res));
matchesRouter.get('/matchs/:id', async (req, res) => findMatchesController.handle(req, res));

export default matchesRouter;
