import { Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { Roles } from '../../auth/roles/role.types';

import { Users } from '../entities/user.entity';

@Injectable()
export default class FilmsSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const users = [
      {
        username: 'Bogdan',
        password: await hash('778899', await genSalt()),
        roles: Roles.Admin,
      },
      {
        username: 'bobr',
        password: await hash('101099', await genSalt()),
      },
      {
        username: 'rshmelev',
        password: await hash('ghbdtnigg', await genSalt()),
      },
    ];

    await connection
      .createQueryBuilder()
      .insert()
      .into(Users)
      .values(users)
      .execute();
  }
}
