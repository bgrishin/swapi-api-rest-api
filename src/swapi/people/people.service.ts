import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { People } from './people.entity';

@Injectable()
export class PeopleService {
  private readonly relationsArr: string[];

  constructor(
    @InjectRepository(People)
    private _peopleRepository: Repository<People>,
  ) {
    this.relationsArr = [
      'homeworld',
      'films',
      'starships',
      'vehicles',
      'species',
    ];
  }

  async getAllPeople(page: number, limit: number): Promise<Pagination<People>> {
    return paginate<People>(this._peopleRepository, { page, limit });
  }

  async getOnePerson(id: number) {
    const person = await this._peopleRepository.findOne({
      where: { id: id.toString() },
      relationLoadStrategy: 'query',
      relations: this.relationsArr,
    });
    if (!person)
      return new HttpException('Person not found', HttpStatus.NOT_FOUND);
    return person;
  }
}
