import { Films } from '../../swapi/film/film.entity';
import { FileImage, PublicImage } from '../../swapi/images/images.entity';
import { People } from '../../swapi/people/people.entity';
import { Planet } from '../../swapi/planet/planet.entity';
import { Species } from '../../swapi/specie/specie.entity';
import { Starships } from '../../swapi/starship/starship.entity';
import { Users } from '../../swapi/user/user.entity';
import { Vehicles } from '../../swapi/vehicle/vehicle.entity';
import { TypeormDatasource } from '../config/typeorm.datasource';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const attentionMessage =
  "\x1b[31m\x1b[5mATTENTION! \x1b[0m\nThis process will destroy all data in your database. Please make sure that you're ready for destructing all data. \nProcess will be started in 10 seconds, to cancel it press \x1b[32mCtrl + C.\x1b[0m";

(async () => {
  console.log('Connecting database.');

  await TypeormDatasource.initialize();

  console.log('Database connected.');

  console.log(attentionMessage);

  const repository = TypeormDatasource.getRepository(Films);
  // now you can call repository methods, for example find:
  const users = await repository.find();
  console.log(users);

  await sleep(10000);

  console.log('Truncating started.');

  const manager = TypeormDatasource.manager;

  await manager.getRepository(Films).clear();

  await manager.getRepository(PublicImage).clear();

  await manager.getRepository(FileImage).clear();

  await manager.getRepository(People).clear();

  await manager.getRepository(Planet).clear();

  await manager.getRepository(Species).clear();

  await manager.getRepository(Starships).clear();

  await manager.getRepository(Users).clear();

  await manager.getRepository(Vehicles).clear();

  console.log('Truncating finished.');

  await TypeormDatasource.destroy();
})();
