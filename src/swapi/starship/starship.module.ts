import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from '../images/images.module';
import { StarshipController } from './starship.controller';
import { Starships } from './starship.entity';
import { StarshipService } from './starship.service';

@Module({
  imports: [TypeOrmModule.forFeature([Starships]), ImagesModule],
  providers: [StarshipService],
  exports: [StarshipService],
  controllers: [StarshipController],
})
export class StarshipModule {}
