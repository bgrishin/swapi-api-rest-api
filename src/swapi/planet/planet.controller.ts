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
import { CreatePlanetDto, UpdatePlanetDto } from './dto/create.planet.dto';
import { PlanetRelations } from './dto/relations.planet.dto';
import { Planet } from './planet.entity';
import { PlanetService } from './planet.service';

@ApiTags('Planet')
@Controller('planet')
export class PlanetController {
  constructor(private _planetService: PlanetService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiOkResponse({ type: Planet })
  getPlanet(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<Pagination<Planet>> {
    return this._planetService.getAllPlanets(page, limit);
  }

  @Get(':id')
  @ApiOkResponse({ type: Planet })
  async getOnePlanet(@Param('id', ParseIntPipe) id: number) {
    const planet = await this._planetService.getOnePlanet(id);
    if (!planet)
      return new HttpException('Planet not found', HttpStatus.NOT_FOUND);
    return planet;
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Role(Roles.admin)
  @UseGuards(AccessJwtAuthGuard, RoleGuard)
  @ApiOkResponse({ type: Planet })
  async deletePlanet(@Param('id', ParseIntPipe) id: number) {
    return this._planetService.deletePlanet(id);
  }

  @Post()
  @ApiBearerAuth()
  @Role(Roles.admin)
  @UseGuards(AccessJwtAuthGuard, RoleGuard)
  @UseInterceptors(FilesInterceptor('images', 10, imageOptions))
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({ type: Planet })
  async createPlanet(
    @Body(ValidationPipe) dto: CreatePlanetDto,
    @UploadedFiles()
    images: Express.Multer.File[],
  ) {
    return this._planetService.createPlanet(dto, images);
  }

  @Put(':id')
  @ApiBearerAuth()
  @Role(Roles.admin)
  @UseGuards(AccessJwtAuthGuard, RoleGuard)
  @ApiOkResponse({ type: Planet })
  @ApiConsumes('multipart/form-data')
  async updatePlanet(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdatePlanetDto,
  ) {
    const Planet = await this._planetService.getOnePlanet(id);
    if (!Planet) throw new NotFoundException();
    return this._planetService.updatePlanet(id, dto);
  }

  @Post('add-images/:id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: AddImagesDto })
  @UseInterceptors(FilesInterceptor('images', 10, imageOptions))
  @ApiBearerAuth()
  @Role(Roles.admin)
  @UseGuards(AccessJwtAuthGuard, RoleGuard)
  @ApiOkResponse({ type: Planet })
  async addImages(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    const Planet = await this._planetService.getOnePlanet(id);
    if (!Planet) throw new NotFoundException();
    return this._planetService.addImages(Planet, images);
  }

  @Put('add-relations/:id')
  @ApiBearerAuth()
  @Role(Roles.admin)
  @UseGuards(AccessJwtAuthGuard, RoleGuard)
  @ApiOkResponse({ type: Planet })
  async createRelations(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) relations: PlanetRelations,
  ) {
    const PlanetToUpdate = await this._planetService.getOnePlanet(id);
    if (!PlanetToUpdate) throw new NotFoundException();
    return this._planetService.addRelations(PlanetToUpdate, { ...relations });
  }

  @Delete('remove-relations/:id')
  @ApiBearerAuth()
  @Role(Roles.admin)
  @UseGuards(AccessJwtAuthGuard, RoleGuard)
  @ApiOkResponse({ type: Planet })
  async removeRelations(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) relations: PlanetRelations,
  ) {
    const PlanetToUpdate = await this._planetService.getOnePlanet(id);
    if (!PlanetToUpdate) throw new NotFoundException();
    return await this._planetService.removeRelations(PlanetToUpdate, {
      ...relations,
    });
  }
}
