import { ApiProperty } from '@nestjs/swagger';

export class JwtTokenDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
