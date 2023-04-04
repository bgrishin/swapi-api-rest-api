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
import { CreatePersonDto, UpdatePersonDto } from './dto/create.person.dto';
import { PersonRelations } from './dto/relations.person.dto';
import { People } from './people.entity';
import { PeopleService } from './people.service';

@ApiTags('People')
@Controller('people')
export class PeopleController {
  constructor(private _peopleService: PeopleService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiOkResponse({ type: People })
  getPeople(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<Pagination<People>> {
    return this._peopleService.getAllPeople(page, limit);
  }

  @Get(':id')
  @ApiOkResponse({ type: People })
  async getOnePerson(@Param('id', ParseIntPipe) id: number) {
    const person = await this._peopleService.getOnePerson(id);
    if (!person)
      return new HttpException('Person not found', HttpStatus.NOT_FOUND);
    return person;
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Role(Roles.admin)
  @UseGuards(AccessJwtAuthGuard, RoleGuard)
  @ApiOkResponse({ type: People })
  async deletePerson(@Param('id', ParseIntPipe) id: number) {
    return this._peopleService.deletePerson(id);
  }

  @Post()
  @ApiBearerAuth()
  @Role(Roles.admin)
  @UseGuards(AccessJwtAuthGuard, RoleGuard)
  @UseInterceptors(FilesInterceptor('images', 10, imageOptions))
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({ type: People })
  async createPerson(
    @Body(ValidationPipe) dto: CreatePersonDto,
    @UploadedFiles()
    images: Express.Multer.File[],
  ) {
    return this._peopleService.createPerson(dto, images);
  }

  @Put(':id')
  @ApiBearerAuth()
  @Role(Roles.admin)
  @UseGuards(AccessJwtAuthGuard, RoleGuard)
  @ApiOkResponse({ type: People })
  @ApiConsumes('multipart/form-data')
  async updatePerson(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdatePersonDto,
  ) {
    const Person = await this._peopleService.getOnePerson(id);
    if (!Person) throw new NotFoundException();
    return this._peopleService.updatePerson(id, dto);
  }

  @Post('add-images/:id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: AddImagesDto })
  @UseInterceptors(FilesInterceptor('images', 10, imageOptions))
  @ApiBearerAuth()
  @Role(Roles.admin)
  @UseGuards(AccessJwtAuthGuard, RoleGuard)
  @ApiOkResponse({ type: People })
  async addImages(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    const Person = await this._peopleService.getOnePerson(id);
    if (!Person) throw new NotFoundException();
    return this._peopleService.addImages(Person, images);
  }

  @Put('add-relations/:id')
  @ApiBearerAuth()
  @Role(Roles.admin)
  @UseGuards(AccessJwtAuthGuard, RoleGuard)
  @ApiOkResponse({ type: People })
  async createRelations(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) relations: PersonRelations,
  ) {
    const PersonToUpdate = await this._peopleService.getOnePerson(id);
    if (!PersonToUpdate) throw new NotFoundException();
    return this._peopleService.addRelations(PersonToUpdate, { ...relations });
  }

  @Delete('remove-relations/:id')
  @ApiBearerAuth()
  @Role(Roles.admin)
  @UseGuards(AccessJwtAuthGuard, RoleGuard)
  @ApiOkResponse({ type: People })
  async removeRelations(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) relations: PersonRelations,
  ) {
    const PersonToUpdate = await this._peopleService.getOnePerson(id);
    if (!PersonToUpdate) throw new NotFoundException();
    return await this._peopleService.removeRelations(PersonToUpdate, {
      ...relations,
    });
  }
}
