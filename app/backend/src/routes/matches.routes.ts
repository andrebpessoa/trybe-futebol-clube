import { Router } from 'express';

import authMiddleware from '../middlewares/auth.middleware';
import { finishMatchController } from '../useCases/FinishMatchUseCase';
import { createMatchController } from '../useCases/CreateMatchUseCase';
import { findMatchesController } from '../useCases/FindMatchesUseCase';
import { editMatchController } from '../useCases/EditMatchUseCase';

const matchesRouter = Router();

matchesRouter.get(
  '/matchs',
  async (req, res) => findMatchesController.handle(req, res),
);

matchesRouter.post(
  '/matchs',
  authMiddleware,
  async (req, res) => createMatchController.handle(req, res),
);

matchesRouter.patch(
  '/matchs/:id/finish',
  authMiddleware,
  async (req, res) => finishMatchController.handle(req, res),
);

matchesRouter.patch(
  '/matchs/:id/',
  authMiddleware,
  async (req, res) => editMatchController.handle(req, res),
);

matchesRouter.patch(
  '/matchs/:id/',
  authMiddleware,
  async (req, res) => finishMatchController.handle(req, res),
);

matchesRouter.get(
  '/matchs/:id',
  async (req, res) => findMatchesController.handle(req, res),
);

export default matchesRouter;
