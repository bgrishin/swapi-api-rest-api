import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Planet } from '../../entities/planet.entity';
import { RelationsBuilder } from '../relationsBuilder';

@Injectable()
export default class PlanetsSeed implements Seeder {
  // 3
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const dataCopy = [];
    async function iteration(url: string): Promise<undefined> {
      const res = await axios.get(url).then((response) => response.data);
      const data = [...res.results];

      await connection
        .createQueryBuilder()
        .insert()
        .into(Planet)
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
    const url = 'https://swapi.dev/api/planets/?page=1';
    await iteration(url);
    RelationsBuilder.setData('planets', dataCopy);
  }
}
