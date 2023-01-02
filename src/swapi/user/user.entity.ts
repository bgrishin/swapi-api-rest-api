import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from '../../auth/types/role.enum';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: null })
  refreshToken: string;

  @Column({ default: Roles.user })
  roles: Roles;
}
