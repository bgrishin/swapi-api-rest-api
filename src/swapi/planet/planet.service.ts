import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { RelationsService } from '../../common/relations/relations.service';
import { ImagesService } from '../images/images.service';
import { CreatePlanetDto, UpdatePlanetDto } from './dto/create.planet.dto';
import { PlanetRelations } from './dto/relations.planet.dto';
import { Planet } from './planet.entity';

@Injectable()
export class PlanetService {
  private readonly relationsArr: string[];

  constructor(
    @InjectRepository(Planet)
    private _planetRepository: Repository<Planet>,

    private _imagesService: ImagesService,

    private _relationsService: RelationsService,
  ) {
    this.relationsArr = [
      'residents',
      'species',
      'films',
      'file_images',
      'public_images',
    ];
  }

  async getAllPlanets(
    page: number,
    limit: number,
  ): Promise<Pagination<Planet>> {
    return paginate<Planet>(this._planetRepository, { page, limit });
  }

  async getOnePlanet(id: number) {
    return await this._planetRepository.findOne({
      where: { id },
      relationLoadStrategy: 'query',
      relations: this.relationsArr,
    });
  }

  async deletePlanet(id: number) {
    const planet = await this.getOnePlanet(id);
    if (!planet)
      return new HttpException('Planet not found', HttpStatus.NOT_FOUND);

    this.relationsArr.forEach((obj) => (planet[obj] = []));
    await this._planetRepository.save(planet);

    return this._planetRepository.delete({ id });
  }

  async createPlanet(planet: CreatePlanetDto, images: Express.Multer.File[]) {
    const [publicImages, fileImages] = await Promise.all([
      this._imagesService.uploadPublicImages(images),
      this._imagesService.uploadFileImages(images),
    ]);
    const planetToCreate: Planet = new Planet();
    Object.assign(planetToCreate, {
      ...planet,
      public_images: publicImages,
      file_images: fileImages,
    });
    return this._planetRepository.save({ ...planetToCreate });
  }

  async updatePlanet(id: number, planet: UpdatePlanetDto) {
    const PlanetToCreate: Planet = new Planet();
    Object.assign(PlanetToCreate, {
      ...planet,
    });
    return this._planetRepository.update(id, { ...PlanetToCreate });
  }

  async addImages(
    planet: Planet,
    images: Express.Multer.File[],
  ): Promise<Planet> {
    const [publicImages, fileImages] = await Promise.all([
      this._imagesService.uploadPublicImages(images),
      this._imagesService.uploadFileImages(images),
    ]);
    planet.public_images.push(...publicImages);
    planet.file_images.push(...fileImages);
    return this._planetRepository.save(planet);
  }

  async addRelations(
    planet: Planet,
    relations: PlanetRelations,
  ): Promise<Planet> {
    const updatedPlanet = await this._relationsService.addRelations(planet, {
      ...relations,
    });
    return this._planetRepository.save(updatedPlanet);
  }

  async removeRelations(
    planet: Planet,
    relations: PlanetRelations,
  ): Promise<Planet> {
    const updatedPlanet = await this._relationsService.removeRelations(planet, {
      ...relations,
    });
    return this._planetRepository.save(updatedPlanet);
  }
}
