import 'dotenv/config';

console.log(__dirname + '/src/database/entities/*.entity.{js,ts}');

export default {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  migrationsTableName: 'migrations_table',
  entities: [__dirname + '/src/database/entities/*.entity.{js,ts}'],
  migrations: [__dirname + '/src/database/migrations/*{.ts,.js}'],
};
