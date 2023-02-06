import { ApiProperty } from '@nestjs/swagger';
import { Roles } from '../types/role.enum';

export class UserJwtPayload {
  @ApiProperty({ example: 'Quartz' })
  username: string;

  @ApiProperty({ example: 'admin' })
  roles: Roles[] | Roles;

  @ApiProperty({ example: '123' })
  sub: number;
}
