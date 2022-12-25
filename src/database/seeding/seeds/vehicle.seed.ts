import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { Vehicles } from '../../entities/vehicle.entity';
import { RelationsBuilder } from '../relationsBuilder';

@Injectable()
export default class VehiclesSeed implements Seeder {
  // 6 (the last, and then we execute relation builder)
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const dataCopy = [];
    async function iteration(url: string): Promise<undefined> {
      const res = await axios.get(url).then((response) => response.data);

      const data = [...res.results];

      await connection
        .createQueryBuilder()
        .insert()
        .into(Vehicles)
        .values(
          data.map((x) => {
            const { created, edited, url, ...entity } = x;
            dataCopy.push(x);
            return { ...entity, id: +url.split('/')[5] };
          }),
        )
        .execute();

      // await Promise.all(
      //   data.map(async (vehicle) => {
      //     const id = +vehicle.url.split('/')[5];
      //     const pilotsIds = getIds(vehicle.pilots);
      //     pilotsIds.map(async (x) => {
      //       await connection
      //         .createQueryBuilder()
      //         .relation(Vehicles, 'pilots')
      //         .of(id)
      //         .add(x);
      //     });
      //   }),
      // );

      if (res.next) {
        return iteration(res.next);
      }
    }
    const url = 'https://swapi.dev/api/vehicles/?page=1';
    await iteration(url);
    RelationsBuilder.setData('vehicles', dataCopy);
    await RelationsBuilder.run(connection);
  }
}
