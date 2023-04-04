import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { RelationsService } from '../../common/relations/relations.service';
import { ImagesService } from '../images/images.service';
import {
  CreateStarshipDto,
  UpdateStarshipDto,
} from './dto/create.starship.dto';
import { StarshipRelations } from './dto/relations.starships.dto';
import { Starships } from './starship.entity';

@Injectable()
export class StarshipService {
  private readonly relationsArr: string[];

  constructor(
    @InjectRepository(Starships)
    private _starshipRepository: Repository<Starships>,

    private _imagesService: ImagesService,

    private _relationsService: RelationsService,
  ) {
    this.relationsArr = ['pilots', 'films', 'file_images', 'public_images'];
  }

  async getAllStarships(
    page: number,
    limit: number,
  ): Promise<Pagination<Starships>> {
    return paginate<Starships>(this._starshipRepository, { page, limit });
  }

  async getOneStarship(id: number) {
    return await this._starshipRepository.findOne({
      where: { id },
      relationLoadStrategy: 'query',
      relations: this.relationsArr,
    });
  }

  async deleteStarship(id: number) {
    const starship = await this.getOneStarship(id);
    if (!starship)
      return new HttpException('Starship not found', HttpStatus.NOT_FOUND);

    this.relationsArr.forEach((obj) => (starship[obj] = []));
    await this._starshipRepository.save(starship);

    return this._starshipRepository.delete({ id });
  }

  async createStarship(
    starship: CreateStarshipDto,
    images: Express.Multer.File[],
  ) {
    const [publicImages, fileImages] = await Promise.all([
      this._imagesService.uploadPublicImages(images),
      this._imagesService.uploadFileImages(images),
    ]);
    const starshipToCreate: Starships = new Starships();
    Object.assign(starshipToCreate, {
      ...starship,
      public_images: publicImages,
      file_images: fileImages,
    });
    return this._starshipRepository.save({ ...starshipToCreate });
  }

  async updateStarship(id: number, starship: UpdateStarshipDto) {
    const StarshipToCreate: Starships = new Starships();
    Object.assign(StarshipToCreate, {
      ...starship,
    });
    return this._starshipRepository.update(id, { ...StarshipToCreate });
  }

  async addImages(
    starship: Starships,
    images: Express.Multer.File[],
  ): Promise<Starships> {
    const [publicImages, fileImages] = await Promise.all([
      this._imagesService.uploadPublicImages(images),
      this._imagesService.uploadFileImages(images),
    ]);
    starship.public_images.push(...publicImages);
    starship.file_images.push(...fileImages);
    return this._starshipRepository.save(starship);
  }

  async addRelations(
    starship: Starships,
    relations: StarshipRelations,
  ): Promise<Starships> {
    const updatedStarship = await this._relationsService.addRelations(
      starship,
      {
        ...relations,
      },
    );
    return this._starshipRepository.save(updatedStarship);
  }

  async removeRelations(
    starship: Starships,
    relations: StarshipRelations,
  ): Promise<Starships> {
    const updatedStarship = await this._relationsService.removeRelations(
      starship,
      {
        ...relations,
      },
    );
    return this._starshipRepository.save(updatedStarship);
  }
}
