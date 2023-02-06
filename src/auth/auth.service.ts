import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcrypt';
import { CreateUserDto } from '../swapi/user/dto/create-user.dto';
import { Users } from '../swapi/user/user.entity';
import { UserService } from '../swapi/user/user.service';
import { UserJwtPayload } from './dto/user-jwt-payload.dto';
import { Roles } from './types/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private _usersService: UserService,
    private _configService: ConfigService,
    private _jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<Users, 'password'> | null> {
    const user = await this._usersService.findOneByUsername(username);
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
    userDto: CreateUserDto,
  ): Promise<Omit<Users, 'password' | 'refreshToken'>> {
    const user = await this._usersService.findOneByUsername(
      userDto.username,
      false,
    );
    if (user) throw new BadRequestException('User is already exists');
    return this.hashData(userDto.password).then(async (hash) => {
      const user = await this._usersService.createUser(userDto.username, hash);
      const { password, refreshToken, ...result } = user;
      return result;
    });
  }

  async logout(id: number) {
    return this._usersService.updateOne(id, { refreshToken: null });
  }

  async addAdmin(username: string): Promise<Omit<Users, 'password'>> {
    let user = await this._usersService.findOneByUsername(username);
    user.roles = Roles.admin;
    user = await this._usersService.addRoleAdmin(user);
    const { password, ...result } = user;
    return result;
  }

  async updateRefreshToken(id: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this._usersService.updateOne(id, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getJwtTokens(payload: UserJwtPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this._jwtService.signAsync(payload, {
        secret: this._configService.get<string>('ACCESS_JWT_SECRET'),
        expiresIn: '30m',
      }),
      this._jwtService.signAsync(payload, {
        secret: this._configService.get<string>('REFRESH_JWT_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(id: string, refreshToken: string) {
    const user = await this._usersService.findOneById(+id);
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
