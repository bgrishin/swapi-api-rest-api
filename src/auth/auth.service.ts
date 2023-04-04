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
import { RefreshTokenService } from './refresh-token/refresh-token.service';
import { Roles } from './types/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private _usersService: UserService,
    private _configService: ConfigService,
    private _refreshTokenService: RefreshTokenService,
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
    const { accessToken, refreshToken } = await this.getJwtTokens(user);
    await this._refreshTokenService.saveRefreshToken(refreshToken, user);
    return { accessToken, refreshToken };
  }

  async register(
    userDto: CreateUserDto,
  ): Promise<Omit<Users, 'password' | 'refreshTokens'>> {
    const user = await this._usersService.findOneByUsername(
      userDto.username,
      false,
    );
    if (user) throw new BadRequestException('User is already exists');
    return this.hashData(userDto.password).then(async (hash) => {
      const user = await this._usersService.createUser(userDto.username, hash);
      const { password, refreshTokens, ...result } = user;
      return result;
    });
  }

  async logout(refreshToken: string) {
    const logout = await this._refreshTokenService.removeRefreshToken(
      refreshToken,
    );
    return { token: refreshToken, logout };
  }

  async addAdmin(username: string): Promise<Omit<Users, 'password'>> {
    let user = await this._usersService.findOneByUsername(username);
    user.roles = Roles.admin;
    user = await this._usersService.addRoleAdmin(user);
    const { password, ...result } = user;
    return result;
  }

  async getJwtTokens(user: Users) {
    const accessTokenPayload = {
      username: user.username,
      roles: user.roles,
      userId: user.id,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this._jwtService.signAsync(accessTokenPayload, {
        secret: this._configService.get<string>('ACCESS_JWT_SECRET'),
        expiresIn: '30m',
      }),
      this._refreshTokenService.generateRefreshToken(user),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(id: string, refreshToken: string) {
    const user = await this._usersService.findOneById(+id);
    if (!user || !user.refreshTokens.length)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = this._refreshTokenService.compareRefreshTokens(
      refreshToken,
      user.refreshTokens.map(({ token }) => token),
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getJwtTokens(user);
    await this._refreshTokenService.saveRefreshToken(tokens.refreshToken, user);
    await this._refreshTokenService.removeRefreshToken(refreshToken);
    return tokens;
  }

  async hashData(data: string) {
    return hash(data, await genSalt());
  }
}
