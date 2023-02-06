import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileImage, PublicImage } from './images.entity';
import { ImagesService } from './images.service';

@Module({
  imports: [TypeOrmModule.forFeature([FileImage, PublicImage])],
  providers: [ImagesService],
  exports: [ImagesService],
})
export class ImagesModule {}
