import ClubsRepository from '../../repositories/implementations/clubs.repository';
import FindClubsController from './FindClubsController';
import FindClubsUseCase from './FindClubsUseCase';

const clubsRepository = new ClubsRepository();

const findClubsUseCase = new FindClubsUseCase(
  clubsRepository,
);

const findClubsController = new FindClubsController(
  findClubsUseCase,
);

export { findClubsController, findClubsUseCase };
