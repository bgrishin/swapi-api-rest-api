import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { AccessJwtAuthGuard } from '../../auth/guards/access.jwt-auth.guard';
import { Role } from '../../auth/role/role.decorator';
import { RoleGuard } from '../../auth/role/role.guard';
import { Roles } from '../../auth/types/role.enum';
import { AddImagesDto } from '../images/dto/add-images.dto';
import { imageOptions } from '../images/images.multer.options';
import { CreateFilmDto } from './dto/create.film.dto';
import { FilmRelations } from './dto/relations.film.dto';
import { Films } from './film.entity';
import { FilmService } from './film.service';

@ApiTags('Films')
@Controller('films')
export class FilmController {
  constructor(private _filmsService: FilmService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  async getFilms(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<Pagination<Films>> {
    return this._filmsService.getAllFilms(page, limit);
  }

  @Get(':id')
  async getOneFilm(@Param('id') id: string) {
    const film = await this._filmsService.getOneFilm(id);
    if (!film) return new HttpException('Film not found', HttpStatus.NOT_FOUND);
    return film;
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Role(Roles.admin)
  @UseGuards(AccessJwtAuthGuard, RoleGuard)
  async deleteFilm(@Param('id') id: string) {
    return this._filmsService.deleteFilm(id);
  }

  @Post()
  @ApiBearerAuth()
  @Role(Roles.admin)
  @UseGuards(AccessJwtAuthGuard, RoleGuard)
  @UseInterceptors(FilesInterceptor('images', 10, imageOptions))
  @ApiConsumes('multipart/form-data')
  async createFilm(
    @Body(ValidationPipe) dto: CreateFilmDto,
    @UploadedFiles()
    images: Express.Multer.File[],
  ) {
    return this._filmsService.createFilm(dto, images);
  }

  @Post('add-images/:id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: AddImagesDto })
  @UseInterceptors(FilesInterceptor('images', 10, imageOptions))
  async addImages(
    @Param('id', ParseIntPipe) id: string,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    const film = await this._filmsService.getOneFilm(id);
    if (!film) throw new NotFoundException();
    return this._filmsService.addImages(film, images);
  }

  @Put('add-relations/:id')
  async createRelations(
    @Param('id') id: string,
    @Body(ValidationPipe) relations: FilmRelations,
  ) {
    const filmToUpdate = await this._filmsService.getOneFilm(id);
    if (!filmToUpdate) throw new NotFoundException();
    return this._filmsService.addRelations(filmToUpdate, { ...relations });
  }

  @Delete('remove-relations/:id')
  async removeRelations(
    @Param('id') id: string,
    @Body(ValidationPipe) relations: FilmRelations,
  ) {
    const filmToUpdate = await this._filmsService.getOneFilm(id);
    if (!filmToUpdate) throw new NotFoundException();
    return await this._filmsService.removeRelations(filmToUpdate, {
      ...relations,
    });
  }
}
