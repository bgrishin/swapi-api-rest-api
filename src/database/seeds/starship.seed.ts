import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { replaceUrls } from '../../utils/seeding.utils';
import { Starships } from '../entities/starship.entity';

@Injectable()
export default class StarshipsSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    async function iteration(url: string): Promise<undefined> {
      const res = await axios.get(url).then((response) => response.data);

      const fetchedData: Starships[] = await Promise.all(
        res.results.map(async (result) => {
          const starships: Starships = result;
          const { created, edited, ...props } = starships;
          return {
            ...props,
            url: replaceUrls(starships),
            films: result.films.map((film) => replaceUrls(film)),
            pilots: result.pilots.map((pilot) => replaceUrls(pilot)),
          };
        }),
      );

      const dataCopy = fetchedData.map((starship) => {
        return {
          url: starship.url,
          films: starship.films,
          pilots: starship.pilots,
        };
      });

      await connection
        .createQueryBuilder()
        .insert()
        .into(Starships)
        .values(fetchedData)
        .execute();

      await Promise.all(
        dataCopy.map(async (starships) => {
          await connection
            .createQueryBuilder()
            .relation(Starships, 'films')
            .of(starships.url)
            .add(starships.films);

          await connection
            .createQueryBuilder()
            .relation(Starships, 'pilots')
            .of(starships.url)
            .add(starships.pilots);
        }),
      );
      if (res.next) {
        return iteration(res.next);
      }
    }
    const url = 'https://swapi.dev/api/starships/?page=1';
    return iteration(url);
  }
}
