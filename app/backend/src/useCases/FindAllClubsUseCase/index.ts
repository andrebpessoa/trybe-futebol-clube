import ClubsRepository from '../../repositories/implementations/ClubsRepository';
import FindAllClubsController from './FindAllClubsController';
import FindAllClubsUseCase from './FindAllClubsUseCase';

const clubsRepository = new ClubsRepository();

const findAllClubsUseCase = new FindAllClubsUseCase(
  clubsRepository,
);

const findAllClubsController = new FindAllClubsController(
  findAllClubsUseCase,
);

export { findAllClubsController, findAllClubsUseCase };
