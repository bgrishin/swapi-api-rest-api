import { Module } from '@nestjs/common';
import { StarshipService } from './starship.service';

@Module({
  providers: [StarshipService]
})
export class StarshipModule {}
