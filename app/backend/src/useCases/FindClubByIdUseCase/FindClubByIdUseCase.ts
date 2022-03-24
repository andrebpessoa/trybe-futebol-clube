import { IClubsRepository } from '../../repositories/IClubsRepository';
import { IFindClubByIdRequestDTO } from './FindClubByIdDTO';
import FindClubByIdError from './FindClubByIdError';

export default class FindClubByIdUseCase {
  constructor(
    private clubsRepository: IClubsRepository,
  ) {}

  async execute(data: IFindClubByIdRequestDTO) {
    const club = await this.clubsRepository.findById(data.id);

    if (club === null) {
      throw new FindClubByIdError('Club not found', 404);
    }

    return club;
  }
}
