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
import { UserDto } from '../swapi/user/user.dto';
import { Users } from '../swapi/user/user.entity';
import { AuthService } from './auth.service';
import { InfoDto, TokenDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Role } from './role/role.decorator';
import { RoleGuard } from './role/role.guard';
import { Roles } from './types/role.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: UserDto })
  @ApiOkResponse({ type: TokenDto })
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: InfoDto })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('signup')
  @ApiBody({ type: UserDto })
  @ApiResponse({ status: 201, type: InfoDto })
  signup(
    @Body(new ValidationPipe()) userDto: UserDto,
  ): Promise<Omit<Users, 'password'>> {
    return this.authService.register(userDto);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: InfoDto })
  @Put('admin/:name')
  @Role(Roles.admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  addAdmin(@Param('name') name: string): Promise<Omit<Users, 'password'>> {
    return this.authService.addAdmin(name);
  }
}
