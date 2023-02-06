import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserJwtPayload } from '../dto/user-jwt-payload.dto';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('REFRESH_JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  validate(req: Request, { sub, username, roles }: UserJwtPayload) {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    return { id: sub, username: username, roles: roles, refreshToken };
  }
}
