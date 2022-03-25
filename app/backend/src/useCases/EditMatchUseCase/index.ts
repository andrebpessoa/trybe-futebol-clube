import MatchesRepository from '../../repositories/implementations/matches.repository';
import EditMatchController from './EditMatchController';
import EditMatchUseCase from './EditMatchUseCase';

const matchesRepository = new MatchesRepository();

const editMatchUseCase = new EditMatchUseCase(
  matchesRepository,
);

const editMatchController = new EditMatchController(
  editMatchUseCase,
);

export { editMatchController, editMatchUseCase };
