import MatchesRepository from '../../repositories/implementations/matches.repository';
import FindMatchesController from './FindMatchesController';
import FindMatchesUseCase from './FindMatchesUseCase';

const matchesRepository = new MatchesRepository();

const findMatchesUseCase = new FindMatchesUseCase(
  matchesRepository,
);

const findMatchesController = new FindMatchesController(
  findMatchesUseCase,
);

export { findMatchesController, findMatchesUseCase };
