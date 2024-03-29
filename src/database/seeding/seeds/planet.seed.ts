import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Planet } from '../../../swapi/planet/planet.entity';
import { RelationsBuilder } from '../relationsBuilder';

@Injectable()
export default class PlanetsSeed implements Seeder {
  // 3
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const dataCopy = [];
    let id = 1;
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
            dataCopy.push({ ...entity, url, id });
            id++;
            return { ...entity };
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
