import {
  Body,
  Controller,
  Delete,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AccessJwtAuthGuard } from '../../auth/guards/access.jwt-auth.guard';
import { Role } from '../../auth/role/role.decorator';
import { RoleGuard } from '../../auth/role/role.guard';
import { Roles } from '../../auth/types/role.enum';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private usersService: UserService) {}

  @Role(Roles.admin)
  @ApiBearerAuth()
  @UseGuards(AccessJwtAuthGuard, RoleGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() userDto: UserDto) {
    return this.usersService.updateOne(+id, userDto);
  }

  @Role(Roles.admin)
  @ApiBearerAuth()
  @UseGuards(AccessJwtAuthGuard, RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
