import 'dotenv/config';
import * as path from 'path';

export default {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  migrationsTableName: 'migrations_table',
  entities: [path.join(__dirname, 'src/**/*.entity{.ts,.js}')],
  seeds: ['src/database/seeding/seeds/**/*{.ts,.js}'],
  migrations: [__dirname + '/src/database/migrations/*{.ts,.js}'],
};
