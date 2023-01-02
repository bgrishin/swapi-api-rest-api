import { Module } from '@nestjs/common';
import { SpecieService } from './specie.service';

@Module({
  providers: [SpecieService],
})
export class SpecieModule {}
