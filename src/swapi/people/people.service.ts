import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { RelationsService } from '../../common/relations/relations.service';
import { ImagesService } from '../images/images.service';
import { CreatePersonDto, UpdatePersonDto } from './dto/create.person.dto';
import { PersonRelations } from './dto/relations.person.dto';
import { People } from './people.entity';

@Injectable()
export class PeopleService {
  private readonly relationsArr: string[];

  constructor(
    @InjectRepository(People)
    private _peopleRepository: Repository<People>,

    private _imagesService: ImagesService,

    private _relationsService: RelationsService,
  ) {
    this.relationsArr = [
      'homeworld',
      'films',
      'starships',
      'vehicles',
      'species',
      'file_images',
      'public_images',
    ];
  }

  async getAllPeople(page: number, limit: number): Promise<Pagination<People>> {
    return paginate<People>(this._peopleRepository, { page, limit });
  }

  async getOnePerson(id: number) {
    return await this._peopleRepository.findOne({
      where: { id },
      relationLoadStrategy: 'query',
      relations: this.relationsArr,
    });
  }

  async deletePerson(id: number) {
    const person = await this.getOnePerson(id);
    if (!person)
      return new HttpException('Personnot found', HttpStatus.NOT_FOUND);

    this.relationsArr.forEach((obj) => (person[obj] = []));
    await this._peopleRepository.save(person);

    return this._peopleRepository.delete({ id });
  }

  async createPerson(person: CreatePersonDto, images: Express.Multer.File[]) {
    const [publicImages, fileImages] = await Promise.all([
      this._imagesService.uploadPublicImages(images),
      this._imagesService.uploadFileImages(images),
    ]);
    const personToCreate: People = new People();
    Object.assign(personToCreate, {
      ...person,
      public_images: publicImages,
      file_images: fileImages,
    });
    return this._peopleRepository.save({ ...personToCreate });
  }

  async updatePerson(id: number, person: UpdatePersonDto) {
    const PersonToCreate: People = new People();
    Object.assign(PersonToCreate, {
      ...person,
    });
    return this._peopleRepository.update(id, { ...PersonToCreate });
  }

  async addImages(
    person: People,
    images: Express.Multer.File[],
  ): Promise<People> {
    const [publicImages, fileImages] = await Promise.all([
      this._imagesService.uploadPublicImages(images),
      this._imagesService.uploadFileImages(images),
    ]);
    person.public_images.push(...publicImages);
    person.file_images.push(...fileImages);
    return this._peopleRepository.save(person);
  }

  async addRelations(
    person: People,
    relations: PersonRelations,
  ): Promise<People> {
    const updatedPerson = await this._relationsService.addRelations(person, {
      ...relations,
    });
    return this._peopleRepository.save(updatedPerson);
  }

  async removeRelations(
    person: People,
    relations: PersonRelations,
  ): Promise<People> {
    const updatedPerson = await this._relationsService.removeRelations(person, {
      ...relations,
    });
    return this._peopleRepository.save(updatedPerson);
  }
}
