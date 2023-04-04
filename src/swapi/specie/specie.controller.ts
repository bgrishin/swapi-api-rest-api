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
  ApiOkResponse,
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
import { CreateSpecieDto, UpdateSpecieDto } from './dto/create.specie.dto';
import { SpecieRelations } from './dto/relations.specie.dto';
import { Species } from './specie.entity';
import { SpecieService } from './specie.service';

@ApiTags('Species')
@Controller('specie')
export class SpecieController {
  constructor(private _specieService: SpecieService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiOkResponse({ type: Species })
  getSpecies(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<Pagination<Species>> {
    return this._specieService.getAllSpecies(page, limit);
  }

  @Get(':id')
  @ApiOkResponse({ type: Species })
  async getOneSpecie(@Param('id', ParseIntPipe) id: number) {
    const specie = await this._specieService.getOneSpecie(id);
    if (!specie)
      return new HttpException('Specie not found', HttpStatus.NOT_FOUND);
    return specie;
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Role(Roles.admin)
  @UseGuards(AccessJwtAuthGuard, RoleGuard)
  @ApiOkResponse({ type: Species })
  async deleteSpecie(@Param('id', ParseIntPipe) id: number) {
    return this._specieService.deleteSpecie(id);
  }

  @Post()
  @ApiBearerAuth()
  @Role(Roles.admin)
  @UseGuards(AccessJwtAuthGuard, RoleGuard)
  @UseInterceptors(FilesInterceptor('images', 10, imageOptions))
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({ type: Species })
  async createSpecie(
    @Body(ValidationPipe) dto: CreateSpecieDto,
    @UploadedFiles()
    images: Express.Multer.File[],
  ) {
    return this._specieService.createSpecie(dto, images);
  }

  @Put(':id')
  @ApiBearerAuth()
  @Role(Roles.admin)
  @UseGuards(AccessJwtAuthGuard, RoleGuard)
  @ApiOkResponse({ type: Species })
  @ApiConsumes('multipart/form-data')
  async updateSpecie(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdateSpecieDto,
  ) {
    const Specie = await this._specieService.getOneSpecie(id);
    if (!Specie) throw new NotFoundException();
    return this._specieService.updateSpecie(id, dto);
  }

  @Post('add-images/:id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: AddImagesDto })
  @UseInterceptors(FilesInterceptor('images', 10, imageOptions))
  @ApiBearerAuth()
  @Role(Roles.admin)
  @UseGuards(AccessJwtAuthGuard, RoleGuard)
  @ApiOkResponse({ type: Species })
  async addImages(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    const Specie = await this._specieService.getOneSpecie(id);
    if (!Specie) throw new NotFoundException();
    return this._specieService.addImages(Specie, images);
  }

  @Put('add-relations/:id')
  @ApiBearerAuth()
  @Role(Roles.admin)
  @UseGuards(AccessJwtAuthGuard, RoleGuard)
  @ApiOkResponse({ type: Species })
  async createRelations(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) relations: SpecieRelations,
  ) {
    const SpecieToUpdate = await this._specieService.getOneSpecie(id);
    if (!SpecieToUpdate) throw new NotFoundException();
    return this._specieService.addRelations(SpecieToUpdate, { ...relations });
  }

  @Delete('remove-relations/:id')
  @ApiBearerAuth()
  @Role(Roles.admin)
  @UseGuards(AccessJwtAuthGuard, RoleGuard)
  @ApiOkResponse({ type: Species })
  async removeRelations(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) relations: SpecieRelations,
  ) {
    const SpecieToUpdate = await this._specieService.getOneSpecie(id);
    if (!SpecieToUpdate) throw new NotFoundException();
    return await this._specieService.removeRelations(SpecieToUpdate, {
      ...relations,
    });
  }
}
