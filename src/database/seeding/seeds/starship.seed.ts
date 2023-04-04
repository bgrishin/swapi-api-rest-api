import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Starships } from '../../../swapi/starship/starship.entity';
import { RelationsBuilder } from '../relationsBuilder';

@Injectable()
export default class StarshipsSeed implements Seeder {
  // 5
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const dataCopy = [];
    let id = 1;
    async function iteration(url: string): Promise<undefined> {
      const res = await axios.get(url).then((response) => response.data);

      const data = [...res.results];

      await connection
        .createQueryBuilder()
        .insert()
        .into(Starships)
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
    const url = 'https://swapi.dev/api/starships/?page=1';
    await iteration(url);
    RelationsBuilder.setData('starships', dataCopy);
  }
}
