import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Starships } from '../../entities/starship.entity';
import { RelationsBuilder } from '../relationsBuilder';

@Injectable()
export default class StarshipsSeed implements Seeder {
  // 5
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const dataCopy = [];
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
            dataCopy.push(x);
            return { ...entity, id: +url.split('/')[5] };
          }),
        )
        .execute();

      // await Promise.all(
      //   data.map(async (starship) => {
      //     const id = +starship.url.split('/')[5];
      //     const pilotsIds = getIds(starship.pilots);
      //     pilotsIds.map(async (x) => {
      //       await connection
      //         .createQueryBuilder()
      //         .relation(Starships, 'pilots')
      //         .of(id)
      //         .add(x);
      //     });
      //   }),
      // );

      if (res.next) {
        return iteration(res.next);
      }
    }
    const url = 'https://swapi.dev/api/starships/?page=1';
    await iteration(url);
    RelationsBuilder.setData('starships', dataCopy);
  }
}
