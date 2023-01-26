import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { People } from './people.entity';
import { PeopleService } from './people.service';

@ApiTags('People')
@Controller('people')
export class PeopleController {
  constructor(private peopleService: PeopleService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  getPeople(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<Pagination<People>> {
    return this.peopleService.getAllPeople(page, limit);
  }

  @Get(':id')
  getOnePerson(@Param('id') id: number) {
    return this.peopleService.getOnePerson(id);
  }
}
