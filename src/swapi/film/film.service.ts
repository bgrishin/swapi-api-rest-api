import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { RelationsService } from '../../common/relations/relations.service';
import { ImagesService } from '../images/images.service';
import { CreateFilmDto, UpdateFilmDto } from './dto/create.film.dto';
import { FilmRelations } from './dto/relations.film.dto';
import { Films } from './film.entity';

@Injectable()
export class FilmService {
  private readonly relationsArr: string[];

  constructor(
    @InjectRepository(Films)
    private _filmsRepository: Repository<Films>,

    private _imagesService: ImagesService,

    private _relationsService: RelationsService,
  ) {
    this.relationsArr = [
      'characters',
      'planets',
      'starships',
      'vehicles',
      'species',
      'file_images',
      'public_images',
    ];
  }

  async getAllFilms(page: number, limit: number): Promise<Pagination<Films>> {
    return paginate<Films>(this._filmsRepository, { page, limit });
  }

  async getOneFilm(id: number) {
    return await this._filmsRepository.findOne({
      where: { id },
      relationLoadStrategy: 'query',
      relations: this.relationsArr,
    });
  }

  async deleteFilm(id: number) {
    const film = await this.getOneFilm(id);
    if (!film) return new HttpException('Film not found', HttpStatus.NOT_FOUND);

    this.relationsArr.forEach((obj) => (film[obj] = []));
    await this._filmsRepository.save(film);

    return this._filmsRepository.delete({ id });
  }

  async createFilm(film: CreateFilmDto, images: Express.Multer.File[]) {
    const [publicImages, fileImages] = await Promise.all([
      this._imagesService.uploadPublicImages(images),
      this._imagesService.uploadFileImages(images),
    ]);
    const filmToCreate: Films = new Films();
    Object.assign(filmToCreate, {
      ...film,
      public_images: publicImages,
      file_images: fileImages,
    });
    return this._filmsRepository.save({ ...filmToCreate });
  }

  async updateFilm(id: number, film: UpdateFilmDto) {
    const filmToCreate: Films = new Films();
    Object.assign(filmToCreate, {
      ...film,
    });
    return this._filmsRepository.update(id, { ...filmToCreate });
  }

  async addImages(film: Films, images: Express.Multer.File[]): Promise<Films> {
    const [publicImages, fileImages] = await Promise.all([
      this._imagesService.uploadPublicImages(images),
      this._imagesService.uploadFileImages(images),
    ]);
    film.public_images.push(...publicImages);
    film.file_images.push(...fileImages);
    return this._filmsRepository.save(film);
  }

  async addRelations(film: Films, relations: FilmRelations): Promise<Films> {
    const updatedFilm = await this._relationsService.addRelations(film, {
      ...relations,
    });
    return this._filmsRepository.save(updatedFilm);
  }

  async removeRelations(film: Films, relations: FilmRelations): Promise<Films> {
    const updatedFilm = await this._relationsService.removeRelations(film, {
      ...relations,
    });
    return this._filmsRepository.save(updatedFilm);
  }
}
