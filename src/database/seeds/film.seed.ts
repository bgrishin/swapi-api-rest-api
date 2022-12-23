import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { getIds } from '../../utils/seeding.utils';

import { Films } from '../entities/film.entity';

@Injectable()
export default class FilmsSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    async function iteration(url: string): Promise<undefined> {
      const res = await axios.get(url).then((response) => response.data);
      const data: any = [...res.results]; //temp any
      await connection
        .createQueryBuilder()
        .insert()
        .into(Films)
        .values({ ...data, id: data.url.split('/')[5] })
        .execute();
      await Promise.all(
        data.map(async (film) => {
          const charactersIds = getIds(film.characters),
            planetsIds = getIds(film.planets),
            starshipsIds = getIds(film.starships),
            vehiclesIds = getIds(film.vehicles),
            speciesIds = getIds(film.species);
          charactersIds.map(async (x) => {
            await connection
              .createQueryBuilder()
              .relation(Films, 'characters')
              .of(film.id)
              .add(x);
          });
          planetsIds.map(async (x) => {
            await connection
              .createQueryBuilder()
              .relation(Films, 'planets')
              .of(film.id)
              .add(x);
          });
          starshipsIds.map(async (x) => {
            await connection
              .createQueryBuilder()
              .relation(Films, 'starships')
              .of(film.id)
              .add(x);
          });
          vehiclesIds.map(async (x) => {
            await connection
              .createQueryBuilder()
              .relation(Films, 'vehicles')
              .of(film.id)
              .add(x);
          });
          speciesIds.map(async (x) => {
            await connection
              .createQueryBuilder()
              .relation(Films, 'species')
              .of(film.id)
              .add(x);
          });
        }),
      );
      if (res.next) {
        return iteration(res.next);
      }
    }
    const url = 'https://swapi.dev/api/films/?page=1';
    return iteration(url);
  }
}
