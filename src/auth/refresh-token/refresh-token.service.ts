import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { Users } from '../../swapi/user/user.entity';
import { UserJwtPayload } from '../dto/user-jwt-payload.dto';
import { RefreshToken as RefreshTokenEntity } from './refresh-token.entity';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshTokenEntity)
    private readonly refreshTokenRepository: Repository<RefreshTokenEntity>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async generateRefreshToken(user: Users): Promise<string> {
    const refreshToken = jwt.sign(
      {
        username: user.username,
        roles: user.roles,
        userId: user.id,
      },
      process.env.REFRESH_JWT_SECRET,
      {
        expiresIn: '7d',
      },
    );
    return refreshToken;
  }

  async saveRefreshToken(refreshToken: string, user: Users): Promise<void> {
    const refreshTokenEntity = new RefreshTokenEntity();
    refreshTokenEntity.token = refreshToken;
    refreshTokenEntity.user = user;
    await this.refreshTokenRepository.save(refreshTokenEntity);
  }

  async removeRefreshToken(refreshToken: string): Promise<boolean> {
    const result = await this.refreshTokenRepository.delete({
      token: refreshToken,
    });
    return !!result.affected;
  }

  async getUserFromRefreshToken(
    refreshToken: string,
  ): Promise<Users | undefined> {
    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_JWT_SECRET,
      ) as UserJwtPayload;
      const userId = decoded.userId;
      return this.usersRepository.findOne({ where: { id: userId } });
    } catch (error) {
      return undefined;
    }
  }

  compareRefreshTokens(refreshToken: string, tokens: string[]): boolean {
    try {
      for (const token of tokens) {
        if (token === refreshToken) {
          return true;
        }
      }
      return false;
    } catch (err) {
      return false;
    }
  }
}
