import { QueryRunner } from 'typeorm';
import { TypeormDatasource } from '../config/typeorm.datasource';

//for now, don't work

const truncateTable = async (queryRunner: QueryRunner, tableName: string) => {
  await queryRunner.query(`ALTER TABLE ${tableName} DISABLE TRIGGER ALL`);
  await queryRunner.query(`TRUNCATE TABLE ${tableName}`);
  await queryRunner.query(`ALTER TABLE ${tableName} ENABLE TRIGGER ALL`);
};

(async () => {
  console.log('Connecting database.');
  await TypeormDatasource.initialize();
  console.log('Database connected.');
  const queryRunner = TypeormDatasource.createQueryRunner();
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  console.log(
    "\x1b[31m\x1b[5mATTENTION! \x1b[0mThis process will destroy all swapi in your database. Please make sure that you're ready for destructing all swapi. Process will be started in 10 seconds, to cancel it press \x1b[32mCtrl + C.\x1b[0m",
  );
  await sleep(10000);
  console.log('Truncating started.');
  await truncateTable(queryRunner, 'file_image');
  await truncateTable(queryRunner, 'films');
  await truncateTable(queryRunner, 'films_characters_people');
  await truncateTable(queryRunner, 'films_planets_planet');
  await truncateTable(queryRunner, 'films_species_species');
  await truncateTable(queryRunner, 'films_starships_starships');
  await truncateTable(queryRunner, 'films_vehicles_vehicles');
  await truncateTable(queryRunner, 'people');
  await truncateTable(queryRunner, 'people_species_species');
  await truncateTable(queryRunner, 'planet');
  await truncateTable(queryRunner, 'public_image');
  await truncateTable(queryRunner, 'species');
  await truncateTable(queryRunner, 'starships');
  await truncateTable(queryRunner, 'starships_pilots_people');
  await truncateTable(queryRunner, 'user');
  await truncateTable(queryRunner, 'vehicles');
  await truncateTable(queryRunner, 'vehicles_pilots_people');
  console.log('Truncating finished.');
})();
