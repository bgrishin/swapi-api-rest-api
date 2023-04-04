import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from '../images/images.module';
import { PlanetController } from './planet.controller';
import { Planet } from './planet.entity';
import { PlanetService } from './planet.service';

@Module({
  imports: [TypeOrmModule.forFeature([Planet]), ImagesModule],
  providers: [PlanetService],
  exports: [PlanetService],
  controllers: [PlanetController],
})
export class PlanetModule {}
