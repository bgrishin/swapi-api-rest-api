import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcrypt';
import { UserDto } from '../swapi/user/user.dto';
import { Users } from '../swapi/user/user.entity';
import { UserService } from '../swapi/user/user.service';
import { Roles } from './types/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<Users, 'password'> | null> {
    const user = await this.usersService.findOne(username);
    if (!user) return null;
    const check = await compare(password, user.password);
    if (check) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: Users) {
    const payload = {
      username: user.username,
      sub: user.id,
      roles: user.roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userDto: UserDto): Promise<Omit<Users, 'password'>> {
    return hash(userDto.password, await genSalt()).then(async (hash) => {
      const user = await this.usersService.createUser(userDto.username, hash);
      const { password, ...result } = user;
      return result;
    });
  }

  async addAdmin(username: string): Promise<Omit<Users, 'password'>> {
    let user = await this.usersService.findOne(username);
    user.roles = Roles.admin;
    user = await this.usersService.addRoleAdmin(user);
    const { password, ...result } = user;
    return result;
  }
}
