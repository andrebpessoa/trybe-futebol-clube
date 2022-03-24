import ClubsRepository from '../../repositories/implementations/ClubsRepository';
import FindClubByIdController from './FindClubByIdController';
import FindClubByIdUseCase from './FindClubByIdUseCase';

const clubsRepository = new ClubsRepository();

const findClubByIdUseCase = new FindClubByIdUseCase(
  clubsRepository,
);

const findClubByIdController = new FindClubByIdController(
  findClubByIdUseCase,
);

export { findClubByIdController, findClubByIdUseCase };
