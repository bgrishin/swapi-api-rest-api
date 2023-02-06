import { Global, Module } from '@nestjs/common';
import { RelationsService } from './relations.service';

@Global()
@Module({
  providers: [RelationsService],
  exports: [RelationsService],
})
export class RelationsModule {}
