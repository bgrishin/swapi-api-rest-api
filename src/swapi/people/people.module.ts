import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from '../images/images.module';
import { PeopleController } from './people.controller';
import { People } from './people.entity';
import { PeopleService } from './people.service';

@Module({
  imports: [TypeOrmModule.forFeature([People]), ImagesModule],
  providers: [PeopleService],
  exports: [PeopleService],
  controllers: [PeopleController],
})
export class PeopleModule {}
