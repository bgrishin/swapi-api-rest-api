import { ApiProperty } from '@nestjs/swagger';

export class LogoutDto {
  @ApiProperty()
  token: string;

  @ApiProperty()
  logout: boolean;
}
