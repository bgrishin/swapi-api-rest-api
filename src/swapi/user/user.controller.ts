import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  ParseIntPipe,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AccessJwtAuthGuard } from '../../auth/guards/access.jwt-auth.guard';
import { Role } from '../../auth/role/role.decorator';
import { Roles } from '../../auth/types/role.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './user.entity';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private usersService: UserService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  getUsers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.usersService.getAllUsers(page, limit);
  }

  @Role(Roles.admin)
  @ApiBearerAuth()
  @UseGuards(AccessJwtAuthGuard)
  @Put()
  update(@Request() req, @Body() userDto: Partial<CreateUserDto>) {
    return this.usersService.updateOne(+req.user.id, userDto);
  }

  @Role(Roles.admin)
  @ApiBearerAuth()
  @UseGuards(AccessJwtAuthGuard)
  @Delete()
  remove(@Request() req) {
    return this.usersService.remove(+req.user.id);
  }
}
