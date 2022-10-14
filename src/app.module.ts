import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Film } from './entities/film.entity';
import { People } from './entities/people.entity';
import { Planet } from './entities/planet.entity';
import { Specie } from './entities/specie.entity';
import { Starship } from './entities/starship.entity';
import { Vehicle } from './entities/vehicle.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get('DB_HOST'),
          port: config.get('DB_PORT'),
          username: config.get('DB_USER'),
          password: config.get('DB_PASSWORD'),
          database: config.get('DB_NAME'),
          entities: [Film, People, Planet, Specie, Starship, Vehicle],
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
