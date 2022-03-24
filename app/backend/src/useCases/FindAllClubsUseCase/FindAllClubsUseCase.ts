import { IClubsRepository } from '../../repositories/IClubsRepository';
import FindAllClubsError from './FindAllClubsError';

export default class FindAllClubsUseCase {
  constructor(
    private clubsRepository: IClubsRepository,
  ) {}

  async execute() {
    const clubs = await this.clubsRepository.findAll();

    if (!clubs) {
      throw new FindAllClubsError('Clubs not found', 404);
    }

    return clubs;
  }
}
