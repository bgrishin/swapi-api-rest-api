import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeormConfig } from './database/config/typeorm.config';
import { FileModule } from './swapi/file/file.module';
import { FilmModule } from './swapi/film/film.module';
import { PeopleModule } from './swapi/people/people.module';
import { PlanetModule } from './swapi/planet/planet.module';
import { SpecieModule } from './swapi/specie/specie.module';
import { StarshipModule } from './swapi/starship/starship.module';
import { UserController } from './swapi/user/user.controller';
import { UserModule } from './swapi/user/user.module';
import { VehicleModule } from './swapi/vehicle/vehicle.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => TypeormConfig as TypeOrmModuleOptions,
      inject: [ConfigService],
    }),
    UserModule,
    FileModule,
    FilmModule,
    PeopleModule,
    PlanetModule,
    SpecieModule,
    StarshipModule,
    VehicleModule,
    AuthModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
