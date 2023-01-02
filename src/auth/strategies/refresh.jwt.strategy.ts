import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserPayload } from '../dto/user-payload.dto';

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

  validate(req: Request, { sub, username, roles }: UserPayload) {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    return { id: sub, username: username, roles: roles, refreshToken };
  }
}
