import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from '../images/images.module';
import { SpecieController } from './specie.controller';
import { Species } from './specie.entity';
import { SpecieService } from './specie.service';

@Module({
  imports: [TypeOrmModule.forFeature([Species]), ImagesModule],
  providers: [SpecieService],
  exports: [SpecieService],
  controllers: [SpecieController],
})
export class SpecieModule {}
