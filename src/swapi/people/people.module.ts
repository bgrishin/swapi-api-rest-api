import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';

@Module({
  providers: [PeopleService]
})
export class PeopleModule {}
