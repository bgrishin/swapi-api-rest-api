import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { Films } from '../../entities/film.entity';
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

      // await Promise.all(
      //   data.map(async (film) => {
      //     const id = +film.url.split('/')[5];
      //     const charactersIds = getIds(film.characters),
      //       planetsIds = getIds(film.planets),
      //       starshipsIds = getIds(film.starships),
      //       vehiclesIds = getIds(film.vehicles),
      //       speciesIds = getIds(film.species);
      //     charactersIds.map(async (x) => {
      //       await connection
      //         .createQueryBuilder()
      //         .relation(Films, 'characters')
      //         .of(id)
      //         .add(x);
      //     });
      //     planetsIds.map(async (x) => {
      //       await connection
      //         .createQueryBuilder()
      //         .relation(Films, 'planets')
      //         .of(id)
      //         .add(x);
      //     });
      //     starshipsIds.map(async (x) => {
      //       await connection
      //         .createQueryBuilder()
      //         .relation(Films, 'starships')
      //         .of(id)
      //         .add(x);
      //     });
      //     vehiclesIds.map(async (x) => {
      //       await connection
      //         .createQueryBuilder()
      //         .relation(Films, 'vehicles')
      //         .of(id)
      //         .add(x);
      //     });
      //     speciesIds.map(async (x) => {
      //       await connection
      //         .createQueryBuilder()
      //         .relation(Films, 'species')
      //         .of(id)
      //         .add(x);
      //     });
      //   }),
      // );
      if (res.next) {
        return iteration(res.next);
      }
    }
    const url = 'https://swapi.dev/api/films/?page=1';
    await iteration(url);
    RelationsBuilder.setData('films', dataCopy);
  }
}
