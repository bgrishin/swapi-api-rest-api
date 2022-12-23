import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { replaceUrls } from '../../utils/seeding.utils';

import { Vehicles } from '../entities/vehicle.entity';

@Injectable()
export default class VehiclesSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    async function iteration(url: string): Promise<undefined> {
      const res = await axios.get(url).then((response) => response.data);

      const fetchedData: Vehicles[] = await Promise.all(
        res.results.map(async (result) => {
          const vehicle: Vehicles = result;
          const { created, edited, ...props } = vehicle;
          return {
            ...props,
            url: replaceUrls(vehicle),
            films: result.films.map((film) => replaceUrls(film)),
            pilots: result.pilots.map((pilot) => replaceUrls(pilot)),
          };
        }),
      );

      const dataCopy = fetchedData.map((vehicle) => {
        return {
          url: vehicle.url,
          films: vehicle.films,
          pilots: vehicle.pilots,
        };
      });

      await connection
        .createQueryBuilder()
        .insert()
        .into(Vehicles)
        .values(fetchedData)
        .execute();

      await Promise.all(
        dataCopy.map(async (vehicle) => {
          await connection
            .createQueryBuilder()
            .relation(Vehicles, 'films')
            .of(vehicle.url)
            .add(vehicle.films);

          await connection
            .createQueryBuilder()
            .relation(Vehicles, 'pilots')
            .of(vehicle.url)
            .add(vehicle.pilots);
        }),
      );

      if (res.next) {
        return iteration(res.next);
      }
    }
    const url = 'https://swapi.dev/api/vehicles/?page=1';
    return iteration(url);
  }
}
