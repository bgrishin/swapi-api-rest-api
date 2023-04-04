import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { RelationsService } from '../../common/relations/relations.service';
import { ImagesService } from '../images/images.service';
import { CreateVehicleDto, UpdateVehicleDto } from './dto/create.vehicle.dto';
import { VehicleRelations } from './dto/relations.vehicle.dto';
import { Vehicles } from './vehicle.entity';

@Injectable()
export class VehicleService {
  private readonly relationsArr: string[];

  constructor(
    @InjectRepository(Vehicles)
    private _vehicleRepository: Repository<Vehicles>,

    private _imagesService: ImagesService,

    private _relationsService: RelationsService,
  ) {
    this.relationsArr = ['pilots', 'films', 'file_images', 'public_images'];
  }

  async getAllVehicles(
    page: number,
    limit: number,
  ): Promise<Pagination<Vehicles>> {
    return paginate<Vehicles>(this._vehicleRepository, { page, limit });
  }

  async getOneVehicle(id: number) {
    return await this._vehicleRepository.findOne({
      where: { id },
      relationLoadStrategy: 'query',
      relations: this.relationsArr,
    });
  }

  async deleteVehicle(id: number) {
    const vehicle = await this.getOneVehicle(id);
    if (!vehicle)
      return new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);

    this.relationsArr.forEach((obj) => (vehicle[obj] = []));
    await this._vehicleRepository.save(vehicle);

    return this._vehicleRepository.delete({ id });
  }

  async createVehicle(
    vehicle: CreateVehicleDto,
    images: Express.Multer.File[],
  ) {
    const [publicImages, fileImages] = await Promise.all([
      this._imagesService.uploadPublicImages(images),
      this._imagesService.uploadFileImages(images),
    ]);
    const vehicleToCreate: Vehicles = new Vehicles();
    Object.assign(vehicleToCreate, {
      ...vehicle,
      public_images: publicImages,
      file_images: fileImages,
    });
    return this._vehicleRepository.save({ ...vehicleToCreate });
  }

  async updateVehicle(id: number, vehicle: UpdateVehicleDto) {
    const VehicleToCreate: Vehicles = new Vehicles();
    Object.assign(VehicleToCreate, {
      ...vehicle,
    });
    return this._vehicleRepository.update(id, { ...VehicleToCreate });
  }

  async addImages(
    vehicle: Vehicles,
    images: Express.Multer.File[],
  ): Promise<Vehicles> {
    const [publicImages, fileImages] = await Promise.all([
      this._imagesService.uploadPublicImages(images),
      this._imagesService.uploadFileImages(images),
    ]);
    vehicle.public_images.push(...publicImages);
    vehicle.file_images.push(...fileImages);
    return this._vehicleRepository.save(vehicle);
  }

  async addRelations(
    vehicle: Vehicles,
    relations: VehicleRelations,
  ): Promise<Vehicles> {
    const updatedVehicle = await this._relationsService.addRelations(vehicle, {
      ...relations,
    });
    return this._vehicleRepository.save(updatedVehicle);
  }

  async removeRelations(
    vehicle: Vehicles,
    relations: VehicleRelations,
  ): Promise<Vehicles> {
    const updatedVehicle = await this._relationsService.removeRelations(
      vehicle,
      {
        ...relations,
      },
    );
    return this._vehicleRepository.save(updatedVehicle);
  }
}
