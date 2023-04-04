import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { AccessJwtAuthGuard } from '../../auth/guards/access.jwt-auth.guard';
import { Role } from '../../auth/role/role.decorator';
import { RoleGuard } from '../../auth/role/role.guard';
import { Roles } from '../../auth/types/role.enum';
import { AddImagesDto } from '../images/dto/add-images.dto';
import { imageOptions } from '../images/images.multer.options';
import { CreateVehicleDto, UpdateVehicleDto } from './dto/create.vehicle.dto';
import { VehicleRelations } from './dto/relations.vehicle.dto';
import { Vehicles } from './vehicle.entity';
import { VehicleService } from './vehicle.service';

@ApiTags('Vehicles')
@Controller('vehicle')
export class VehicleController {
  constructor(private _vehicleService: VehicleService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiOkResponse({ type: Vehicles })
  getVehicles(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<Pagination<Vehicles>> {
    return this._vehicleService.getAllVehicles(page, limit);
  }

  @Get(':id')
  @ApiOkResponse({ type: Vehicles })
  async getOneVehicle(@Param('id', ParseIntPipe) id: number) {
    const vehicle = await this._vehicleService.getOneVehicle(id);
    if (!vehicle)
      return new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);
    return vehicle;
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Role(Roles.admin)
  @UseGuards(AccessJwtAuthGuard, RoleGuard)
  @ApiOkResponse({ type: Vehicles })
  async deleteVehicle(@Param('id', ParseIntPipe) id: number) {
    return this._vehicleService.deleteVehicle(id);
  }

  @Post()
  @ApiBearerAuth()
  @Role(Roles.admin)
  @UseGuards(AccessJwtAuthGuard, RoleGuard)
  @UseInterceptors(FilesInterceptor('images', 10, imageOptions))
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({ type: Vehicles })
  async createVehicle(
    @Body(ValidationPipe) dto: CreateVehicleDto,
    @UploadedFiles()
    images: Express.Multer.File[],
  ) {
    return this._vehicleService.createVehicle(dto, images);
  }

  @Put(':id')
  @ApiBearerAuth()
  @Role(Roles.admin)
  @UseGuards(AccessJwtAuthGuard, RoleGuard)
  @ApiOkResponse({ type: Vehicles })
  @ApiConsumes('multipart/form-data')
  async updateVehicle(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) dto: UpdateVehicleDto,
  ) {
    const Vehicle = await this._vehicleService.getOneVehicle(id);
    if (!Vehicle) throw new NotFoundException();
    return this._vehicleService.updateVehicle(id, dto);
  }

  @Post('add-images/:id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: AddImagesDto })
  @UseInterceptors(FilesInterceptor('images', 10, imageOptions))
  @ApiBearerAuth()
  @Role(Roles.admin)
  @UseGuards(AccessJwtAuthGuard, RoleGuard)
  @ApiOkResponse({ type: Vehicles })
  async addImages(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    const Vehicle = await this._vehicleService.getOneVehicle(id);
    if (!Vehicle) throw new NotFoundException();
    return this._vehicleService.addImages(Vehicle, images);
  }

  @Put('add-relations/:id')
  @ApiBearerAuth()
  @Role(Roles.admin)
  @UseGuards(AccessJwtAuthGuard, RoleGuard)
  @ApiOkResponse({ type: Vehicles })
  async createRelations(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) relations: VehicleRelations,
  ) {
    const VehicleToUpdate = await this._vehicleService.getOneVehicle(id);
    if (!VehicleToUpdate) throw new NotFoundException();
    return this._vehicleService.addRelations(VehicleToUpdate, { ...relations });
  }

  @Delete('remove-relations/:id')
  @ApiBearerAuth()
  @Role(Roles.admin)
  @UseGuards(AccessJwtAuthGuard, RoleGuard)
  @ApiOkResponse({ type: Vehicles })
  async removeRelations(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) relations: VehicleRelations,
  ) {
    const VehicleToUpdate = await this._vehicleService.getOneVehicle(id);
    if (!VehicleToUpdate) throw new NotFoundException();
    return await this._vehicleService.removeRelations(VehicleToUpdate, {
      ...relations,
    });
  }
}
