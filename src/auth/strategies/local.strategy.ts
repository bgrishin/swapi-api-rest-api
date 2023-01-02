import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Roles } from '../types/role.enum';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(
    username: string,
    password: string,
  ): Promise<{ id: number; username: string; roles: Roles }> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new BadRequestException();
    }
    return user;
  }
}
