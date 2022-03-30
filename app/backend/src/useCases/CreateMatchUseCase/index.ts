import ClubsRepository from '../../repositories/implementations/clubs.repository';
import MatchesRepository from '../../repositories/implementations/matches.repository';
import CreateMatchController from './CreateMatchController';
import CreateMatchUseCase from './CreateMatchUseCase';

const matchesRepository = new MatchesRepository();
const clubsRepository = new ClubsRepository();

const createMatchUseCase = new CreateMatchUseCase(
  matchesRepository,
  clubsRepository,
);

const createMatchController = new CreateMatchController(
  createMatchUseCase,
);

export { createMatchController, createMatchUseCase };
