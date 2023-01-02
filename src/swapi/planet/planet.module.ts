import { Module } from '@nestjs/common';
import { PlanetService } from './planet.service';

@Module({
  providers: [PlanetService]
})
export class PlanetModule {}
