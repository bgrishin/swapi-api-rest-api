import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePlanetDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly diameter: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly rotation_period: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly orbital_period: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly gravity: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly population: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly climate: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly terrain: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly surface_water: string;

  @ApiProperty({ type: 'string', format: 'binary', isArray: true })
  readonly images: Express.Multer.File[];
}

export class UpdatePlanetDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly diameter: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly rotation_period: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly orbital_period: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly gravity: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly population: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly climate: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly terrain: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly surface_water: string;
}
