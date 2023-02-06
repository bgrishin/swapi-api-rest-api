import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from '../images/images.module';
import { FilmController } from './film.controller';
import { Films } from './film.entity';
import { FilmService } from './film.service';

@Module({
  imports: [TypeOrmModule.forFeature([Films]), ImagesModule],
  providers: [FilmService],
  exports: [FilmService],
  controllers: [FilmController],
})
export class FilmModule {}
