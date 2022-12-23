import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from '../../auth/roles/role.types';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @ApiProperty({ example: 'Bogdan', description: 'Username' })
  username: string;

  @Column()
  @ApiProperty({ example: '1234321', description: 'Password' })
  password: string;

  @Column({ default: Roles.User })
  roles: Roles;
}
