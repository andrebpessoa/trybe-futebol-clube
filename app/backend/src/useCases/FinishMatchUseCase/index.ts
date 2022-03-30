import MatchesRepository from '../../repositories/implementations/matches.repository';
import FinishMatchController from './FinishMatchController';
import FinishMatchUseCase from './FinishMatchUseCase';

const matchesRepository = new MatchesRepository();

const finishMatchUseCase = new FinishMatchUseCase(
  matchesRepository,
);

const finishMatchController = new FinishMatchController(
  finishMatchUseCase,
);

export { finishMatchController, finishMatchUseCase };
