import ErrorMiddleware from '../../middlewares/ErrorMiddleware';
import { IClubsRepository } from '../../repositories/IClubsRepository';
import { IFindClubsRequestDTO } from './FindClubsDTO';

export default class FindClubsUseCase {
  constructor(
    private clubsRepository: IClubsRepository,
  ) {}

  async execute(data: IFindClubsRequestDTO) {
    if (data.id) {
      const club = await this.clubsRepository.findById(data.id);

      if (club === null) {
        throw new ErrorMiddleware('Club not found', 404);
      }

      return club;
    }

    return this.clubsRepository.findAll();
  }
}
