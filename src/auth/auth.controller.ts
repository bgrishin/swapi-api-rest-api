import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '../common/decorators/user.decorator';
import { CreateUserDto } from '../swapi/user/dto/create-user.dto';
import { Users } from '../swapi/user/user.entity';
import { AuthService } from './auth.service';
import { JwtTokenDto } from './dto/jwt-token.dto';
import { LogoutDto } from './dto/logout.dto';
import { InfoDto } from './dto/profile-info.dto';
import { AccessJwtAuthGuard } from './guards/access.jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshTokenGuard } from './guards/refresh.jwt-auth.guard';
import { Role } from './role/role.decorator';
import { RoleGuard } from './role/role.guard';
import { Roles } from './types/role.enum';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse({ type: JwtTokenDto })
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  signIn(@User() user) {
    return this.authService.login(user);
  }

  @Post('signup')
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, type: InfoDto })
  signup(
    @Body(new ValidationPipe()) userDto: CreateUserDto,
  ): Promise<Omit<Users, 'password' | 'refreshTokens'>> {
    return this.authService.register(userDto);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: InfoDto })
  @UseGuards(AccessJwtAuthGuard)
  @Get('profile')
  getProfile(@User() user) {
    return user;
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
  @ApiOkResponse({ type: JwtTokenDto })
  @UseGuards(RefreshTokenGuard)
  @Put('refresh')
  refreshTokens(@User() { id, refreshToken }) {
    return this.authService.refreshTokens(id, refreshToken);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: LogoutDto })
  @UseGuards(RefreshTokenGuard)
  @Get('logout')
  logout(@User() { refreshToken }) {
    return this.authService.logout(refreshToken);
  }
}
