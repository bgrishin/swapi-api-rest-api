import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { RelationsService } from '../../common/relations/relations.service';
import { ImagesService } from '../images/images.service';
import { CreateSpecieDto, UpdateSpecieDto } from './dto/create.specie.dto';
import { SpecieRelations } from './dto/relations.specie.dto';
import { Species } from './specie.entity';

@Injectable()
export class SpecieService {
  private readonly relationsArr: string[];

  constructor(
    @InjectRepository(Species)
    private _specieRepository: Repository<Species>,

    private _imagesService: ImagesService,

    private _relationsService: RelationsService,
  ) {
    this.relationsArr = [
      'homeworld',
      'people',
      'films',
      'file_images',
      'public_images',
    ];
  }

  async getAllSpecies(
    page: number,
    limit: number,
  ): Promise<Pagination<Species>> {
    return paginate<Species>(this._specieRepository, { page, limit });
  }

  async getOneSpecie(id: number) {
    return await this._specieRepository.findOne({
      where: { id },
      relationLoadStrategy: 'query',
      relations: this.relationsArr,
    });
  }

  async deleteSpecie(id: number) {
    const specie = await this.getOneSpecie(id);
    if (!specie)
      return new HttpException('Specie not found', HttpStatus.NOT_FOUND);

    this.relationsArr.forEach((obj) => (specie[obj] = []));
    await this._specieRepository.save(specie);

    return this._specieRepository.delete({ id });
  }

  async createSpecie(specie: CreateSpecieDto, images: Express.Multer.File[]) {
    const [publicImages, fileImages] = await Promise.all([
      this._imagesService.uploadPublicImages(images),
      this._imagesService.uploadFileImages(images),
    ]);
    const specieToCreate: Species = new Species();
    Object.assign(specieToCreate, {
      ...specie,
      public_images: publicImages,
      file_images: fileImages,
    });
    return this._specieRepository.save({ ...specieToCreate });
  }

  async updateSpecie(id: number, specie: UpdateSpecieDto) {
    const SpecieToCreate: Species = new Species();
    Object.assign(SpecieToCreate, {
      ...specie,
    });
    return this._specieRepository.update(id, { ...SpecieToCreate });
  }

  async addImages(
    specie: Species,
    images: Express.Multer.File[],
  ): Promise<Species> {
    const [publicImages, fileImages] = await Promise.all([
      this._imagesService.uploadPublicImages(images),
      this._imagesService.uploadFileImages(images),
    ]);
    specie.public_images.push(...publicImages);
    specie.file_images.push(...fileImages);
    return this._specieRepository.save(specie);
  }

  async addRelations(
    specie: Species,
    relations: SpecieRelations,
  ): Promise<Species> {
    const updatedSpecie = await this._relationsService.addRelations(specie, {
      ...relations,
    });
    return this._specieRepository.save(updatedSpecie);
  }

  async removeRelations(
    specie: Species,
    relations: SpecieRelations,
  ): Promise<Species> {
    const updatedSpecie = await this._relationsService.removeRelations(specie, {
      ...relations,
    });
    return this._specieRepository.save(updatedSpecie);
  }
}
