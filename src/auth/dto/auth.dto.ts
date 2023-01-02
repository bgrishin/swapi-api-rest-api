import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty({ required: true })
  accessToken: string;
}

export class InfoDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Quartz' })
  username: string;

  @ApiProperty({ example: 'mykowomy' })
  roles: string;
}
