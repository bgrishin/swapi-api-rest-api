import { ApiProperty } from '@nestjs/swagger';

export class RelationsDto {
  @ApiProperty()
  relations: string[];
}
