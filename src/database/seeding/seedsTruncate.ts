import { TypeormDatasource } from '../config/typeorm.datasource';

const { log } = console;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function truncateTable(tableName: string) {
  const query = `TRUNCATE TABLE "${tableName}" RESTART IDENTITY CASCADE`;
  await TypeormDatasource.query(query);
}

const attentionMessage =
  "\x1b[31m\x1b[5mATTENTION! \x1b[0m\nThis process will destroy all data in your database. Please make sure that you're ready for destructing all data. \nProcess will be started in 10 seconds, to cancel it press \x1b[32mCtrl + C.\x1b[0m";

(async () => {
  log('Connecting database.');

  await TypeormDatasource.initialize();

  log('Database connected.');

  log(attentionMessage);

  await sleep(10000);

  log('Truncating started.');

  await truncateTable('file_image');
  await truncateTable('films');
  await truncateTable('films_characters_people');
  await truncateTable('films_file_images_file_image');
  await truncateTable('films_planets_planet');
  await truncateTable('films_public_images_public_image');
  await truncateTable('films_species_species');
  await truncateTable('films_starships_starships');
  await truncateTable('films_vehicles_vehicles');
  await truncateTable('people');
  await truncateTable('people_file_images_file_image');
  await truncateTable('people_public_images_public_image');
  await truncateTable('people_species_species');
  await truncateTable('planet');
  await truncateTable('planet_file_images_file_image');
  await truncateTable('planet_public_images_public_image');
  await truncateTable('public_image');
  await truncateTable('species');
  await truncateTable('species_file_images_file_image');
  await truncateTable('species_public_images_public_image');
  await truncateTable('starships');
  await truncateTable('starships_file_images_file_image');
  await truncateTable('starships_public_images_public_image');
  await truncateTable('starships_pilots_people');
  await truncateTable('users');
  await truncateTable('vehicles');
  await truncateTable('vehicles_pilots_people');
  await truncateTable('vehicles_file_images_file_image');
  await truncateTable('vehicles_public_images_public_image');

  log('Truncating finished.');

  await TypeormDatasource.destroy();
})();
