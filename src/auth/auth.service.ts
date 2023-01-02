import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcrypt';
import { UserDto } from '../swapi/user/user.dto';
import { Users } from '../swapi/user/user.entity';
import { UserService } from '../swapi/user/user.service';
import { UserPayload } from './dto/user-payload.dto';
import { Roles } from './types/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<Users, 'password'> | null> {
    const user = await this.usersService.findOneByUsername(username);
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
      roles: user.roles,
      sub: user.id,
    };
    const tokens = await this.getJwtTokens(payload);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async register(
    userDto: UserDto,
  ): Promise<Omit<Users, 'password' | 'refreshToken'>> {
    const user = await this.usersService.findOneByUsername(
      userDto.username,
      false,
    );
    if (user) throw new BadRequestException('User is already exists');
    return this.hashData(userDto.password).then(async (hash) => {
      const user = await this.usersService.createUser(userDto.username, hash);
      const { password, refreshToken, ...result } = user;
      return result;
    });
  }

  async logout(id: number) {
    return this.usersService.updateOne(id, { refreshToken: null });
  }

  async addAdmin(username: string): Promise<Omit<Users, 'password'>> {
    let user = await this.usersService.findOneByUsername(username);
    user.roles = Roles.admin;
    user = await this.usersService.addRoleAdmin(user);
    const { password, ...result } = user;
    return result;
  }

  async updateRefreshToken(id: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.usersService.updateOne(id, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getJwtTokens(payload: UserPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('ACCESS_JWT_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('REFRESH_JWT_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(id: string, refreshToken: string) {
    const user = await this.usersService.findOneById(+id);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await compare(refreshToken, user.refreshToken);
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const payload = {
      username: user.username,
      roles: user.roles,
      sub: user.id,
    };
    const tokens = await this.getJwtTokens(payload);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async hashData(data: string) {
    return hash(data, await genSalt());
  }
}
