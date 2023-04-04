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
import {
  CreateStarshipDto,
  UpdateStarshipDto,
} from './dto/create.starship.dto';
import { StarshipRelations } from './dto/relations.starships.dto';
import { Starships } from './starship.entity';
import { StarshipService } from './starship.service';

@ApiTags('Starships')
@Controller('starship')
export class StarshipController {
  constructor(private _starshipService: StarshipService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiOkResponse({ type: Starships })
  getStarships(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<Pagination<Starships>> {
    return this._starshipService.getAllStarships(page, limit);
  }

  @Get(':id')
  @ApiOkResponse({ type: Starships })
  async getOneStarship(@Param('id', ParseIntPipe) id: number) {
    const starship = await this._starshipService.getOneStarship(id);
    if (!starship)
      return new HttpException('Starship not found', HttpStatus.NOT_FOUND);
    return starship;
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Role(Roles.admin)
  @UseGuards(AccessJwtAuthGuard, RoleGuard)
  @ApiOkResponse({ type: Starships })
  async deleteStarship(@Param('id', ParseIntPipe) id: number) {
    return this._starshipService.deleteStarship(id);
  }

  @Post()
  @ApiBearerAuth()
  @Role(Roles.admin)
  @UseGuards(AccessJwtAuthGuard, RoleGuard)
  @UseInterceptors(FilesInterceptor('images', 10, imageOptions))
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({ type: Starships })
  async createStarship(
    @Body(ValidationPipe) dto: CreateStarshipDto,
    @UploadedFiles()
    images: Express.Multer.File[],
  ) {
    return this._starshipService.createStarship(dto, images);
  }

  @Put(':id')
  @ApiBearerAuth()
  @Role(Roles.admin)
  @UseGuards(AccessJwtAuthGuard, RoleGuard)
  @ApiOkResponse({ type: Starships })
  @ApiConsumes('multipart/form-data')
  async updateStarship(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdateStarshipDto,
  ) {
    const Starship = await this._starshipService.getOneStarship(id);
    if (!Starship) throw new NotFoundException();
    return this._starshipService.updateStarship(id, dto);
  }

  @Post('add-images/:id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: AddImagesDto })
  @UseInterceptors(FilesInterceptor('images', 10, imageOptions))
  @ApiBearerAuth()
  @Role(Roles.admin)
  @UseGuards(AccessJwtAuthGuard, RoleGuard)
  @ApiOkResponse({ type: Starships })
  async addImages(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    const Starship = await this._starshipService.getOneStarship(id);
    if (!Starship) throw new NotFoundException();
    return this._starshipService.addImages(Starship, images);
  }

  @Put('add-relations/:id')
  @ApiBearerAuth()
  @Role(Roles.admin)
  @UseGuards(AccessJwtAuthGuard, RoleGuard)
  @ApiOkResponse({ type: Starships })
  async createRelations(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) relations: StarshipRelations,
  ) {
    const StarshipToUpdate = await this._starshipService.getOneStarship(id);
    if (!StarshipToUpdate) throw new NotFoundException();
    return this._starshipService.addRelations(StarshipToUpdate, {
      ...relations,
    });
  }

  @Delete('remove-relations/:id')
  @ApiBearerAuth()
  @Role(Roles.admin)
  @UseGuards(AccessJwtAuthGuard, RoleGuard)
  @ApiOkResponse({ type: Starships })
  async removeRelations(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) relations: StarshipRelations,
  ) {
    const StarshipToUpdate = await this._starshipService.getOneStarship(id);
    if (!StarshipToUpdate) throw new NotFoundException();
    return await this._starshipService.removeRelations(StarshipToUpdate, {
      ...relations,
    });
  }
}
