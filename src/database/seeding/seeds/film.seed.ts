import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { Films } from '../../../swapi/films/film.entity';
import { RelationsBuilder } from '../relationsBuilder';

@Injectable()
export default class FilmsSeeder implements Seeder {
  // 1
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const dataCopy = [];
    async function iteration(url: string): Promise<undefined> {
      const res = await axios.get(url).then((response) => response.data);
      const data = [...res.results];
      await connection
        .createQueryBuilder()
        .insert()
        .into(Films)
        .values(
          data.map((x) => {
            const { created, edited, url, ...entity } = x;
            dataCopy.push(x);
            return { ...entity, id: +url.split('/')[5] };
          }),
        )
        .execute();

      if (res.next) {
        return iteration(res.next);
      }
    }
    const url = 'https://swapi.dev/api/films/?page=1';
    await iteration(url);
    RelationsBuilder.setData('films', dataCopy);
  }
}
