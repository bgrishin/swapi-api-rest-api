import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { SignUserDto, UserDto } from '../swapi/user/user.dto';
import { Users } from '../swapi/user/user.entity';
import { AuthService } from './auth.service';
import { InfoDto, TokenDto } from './dto/auth.dto';
import { AccessJwtAuthGuard } from './guards/access.jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshTokenGuard } from './guards/refresh.jwt-auth.guard';
import { Role } from './role/role.decorator';
import { RoleGuard } from './role/role.guard';
import { Roles } from './types/role.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: SignUserDto })
  @ApiOkResponse({ type: TokenDto })
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: InfoDto })
  @UseGuards(AccessJwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('signup')
  @ApiBody({ type: SignUserDto })
  @ApiResponse({ status: 201, type: InfoDto })
  signup(
    @Body(new ValidationPipe()) userDto: UserDto,
  ): Promise<Omit<Users, 'password' | 'refreshToken'>> {
    return this.authService.register(userDto);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: InfoDto })
  @Put('admin/:name')
  @Role(Roles.admin)
  @UseGuards(AccessJwtAuthGuard, RoleGuard)
  addAdmin(@Param('name') name: string): Promise<Omit<Users, 'password'>> {
    return this.authService.addAdmin(name);
  }

  @ApiBearerAuth()
  @UseGuards(RefreshTokenGuard)
  @Put('refresh')
  refreshTokens(@Request() req) {
    const userId = req.user.id;
    const refreshToken = req.user.refreshToken;
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @ApiBearerAuth()
  @UseGuards(AccessJwtAuthGuard)
  @Get('logout')
  logout(@Request() req) {
    this.authService.logout(req.user.id);
  }
}
