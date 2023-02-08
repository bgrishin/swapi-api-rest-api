import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { Vehicles } from '../../../swapi/vehicle/vehicle.entity';
import { RelationsBuilder } from '../relationsBuilder';

@Injectable()
export default class VehiclesSeed implements Seeder {
  // 6 (the last, and then we execute relation builder)
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const dataCopy = [];
    let id = 1;
    async function iteration(url: string): Promise<undefined> {
      const res = await axios.get(url).then((response) => response.data);

      const data = [...res.results];

      await connection
        .createQueryBuilder()
        .insert()
        .into(Vehicles)
        .values(
          data.map((x, i) => {
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
    const url = 'https://swapi.dev/api/vehicles/?page=1';
    await iteration(url);
    RelationsBuilder.setData('vehicles', dataCopy);
    await RelationsBuilder.run(connection);
  }
}
