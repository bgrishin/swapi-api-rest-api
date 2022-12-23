import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { replaceUrls } from '../../utils/seeding.utils';
import { People } from '../entities/people.entity';
import { Planets } from '../entities/planet.entity';

@Injectable()
export default class PlanetsSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    async function iteration(url: string): Promise<undefined> {
      const res = await axios.get(url).then((response) => response.data);

      const fetchedData: Planets[] = await Promise.all(
        res.results.map(async (result) => {
          const planet: Planets = result;
          const { created, edited, ...props } = planet;
          return {
            ...props,
            url: replaceUrls(planet),
            films: result.films.map((film) => replaceUrls(film)),
            residents: result.residents.map((resident) =>
              replaceUrls(resident),
            ),
          };
        }),
      );

      const dataCopy = fetchedData.map((planet) => {
        return {
          name: planet.name,
          films: planet.films,
          residents: planet.residents,
          url: planet.url,
        };
      });

      await connection
        .createQueryBuilder()
        .insert()
        .into(Planets)
        .values(fetchedData)
        .execute();

      await Promise.all(
        dataCopy.map(async (planet) => {
          await connection
            .createQueryBuilder()
            .relation(Planets, 'films')
            .of(planet.url)
            .add(planet.films);

          const user = await connection
            .createQueryBuilder(People, 'people')
            .select(['people.name'])
            .where('people.url IN (:...ids)', {
              ids: planet.residents.length === 0 ? [''] : planet.residents,
            })
            .getMany();

          await connection
            .createQueryBuilder()
            .relation(Planets, 'residents')
            .of(planet.url)
            .add(user);
        }),
      );

      if (res.next) {
        return iteration(res.next);
      }
    }
    const url = 'https://swapi.dev/api/planets/?page=1';
    return iteration(url);
  }
}
