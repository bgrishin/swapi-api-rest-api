import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { People } from '../entities/people.entity';

@Injectable()
export default class PeopleSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    async function iteration(url: string): Promise<undefined> {
      const res = await axios.get(url).then((response) => response.data);

      const data = [...res.results];
      //
      // const dataCopy = fetchedData.map((person) => {
      //   return {
      //     films: person.films,
      //   };
      // });
      //
      await connection
        .createQueryBuilder()
        .insert()
        .into(People)
        .values(data)
        .execute();
      //
      // await Promise.all(
      //   dataCopy.map(async (person) => {
      //     await connection
      //       .createQueryBuilder()
      //       .relation(People, 'films')
      //       .of(person.id)
      //       .add(person.films);
      //   }),
      // );

      if (res.next) {
        return iteration(res.next);
      }
    }
    const url = 'https://swapi.dev/api/people/?page=1';
    return iteration(url);
  }
}
