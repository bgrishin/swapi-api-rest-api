import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeormConfig } from './database/config/typeorm.config';
import { FilmModule } from './swapi/film/film.module';
import { ImagesModule } from './swapi/images/images.module';
import { PeopleModule } from './swapi/people/people.module';
import { PlanetModule } from './swapi/planet/planet.module';
import { SpecieModule } from './swapi/specie/specie.module';
import { StarshipModule } from './swapi/starship/starship.module';
import { UserController } from './swapi/user/user.controller';
import { UserModule } from './swapi/user/user.module';
import { VehicleModule } from './swapi/vehicle/vehicle.module';
import { RelationsModule } from './common/relations/relations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validationSchema: Joi.object({
        DB_USER: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PASSWORD: Joi.string().allow(''),
        DB_PORT: Joi.number().required(),

        APP_HOST: Joi.string().required(),
        APP_PORT: Joi.number().required(),

        ACCESS_JWT_SECRET: Joi.string().required(),
        REFRESH_JWT_SECRET: Joi.string().required(),

        AWS_REGION: Joi.string().required(),
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
        AWS_PUBLIC_BUCKET_NAME: Joi.string().required(),
      }),
    }),
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => TypeormConfig as TypeOrmModuleOptions,
      inject: [ConfigService],
    }),
    UserModule,
    ImagesModule,
    FilmModule,
    PeopleModule,
    PlanetModule,
    SpecieModule,
    StarshipModule,
    VehicleModule,
    AuthModule,
    RelationsModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
