import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { replaceUrls } from '../../utils/seeding.utils';

import { Species } from '../entities/specie.entity';

@Injectable()
export default class SpeciesSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    async function iteration(url: string): Promise<undefined> {
      const res = await axios.get(url).then((response) => response.data);

      const fetchedData: Species[] = await Promise.all(
        res.results.map(async (result) => {
          const specie: Species = result;
          const { created, edited, ...props } = specie;
          return {
            ...props,
            url: replaceUrls(specie),
            homeworld: replaceUrls(specie, true),
            films: result.films.map((film) => replaceUrls(film)),
            people: result.people.map((people) => replaceUrls(people)),
          };
        }),
      );

      const dataCopy = fetchedData.map((species) => {
        return {
          url: species.url,
          films: species.films,
          people: species.people,
        };
      });

      await connection
        .createQueryBuilder()
        .insert()
        .into(Species)
        .values(fetchedData)
        .execute();

      await Promise.all(
        dataCopy.map(async (species) => {
          await connection
            .createQueryBuilder()
            .relation(Species, 'films')
            .of(species.url)
            .add(species.films);

          await connection
            .createQueryBuilder()
            .relation(Species, 'people')
            .of(species.url)
            .add(species.people);
        }),
      );

      if (res.next) {
        return iteration(res.next);
      }
    }
    const url = 'https://swapi.dev/api/species/?page=1';
    return iteration(url);
  }
}
