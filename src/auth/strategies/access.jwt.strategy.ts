import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserJwtPayload } from '../dto/user-jwt-payload.dto';

@Injectable()
export class AccessJwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('ACCESS_JWT_SECRET'),
    });
  }

  async validate({ userId, username, roles }: UserJwtPayload) {
    return { id: userId, username: username, roles: roles };
  }
}
