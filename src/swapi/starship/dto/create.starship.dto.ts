import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStarshipDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly model: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly starship_class: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly manufacturer: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly cost_in_credits: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly length: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly crew: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly passengers: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly max_atmosphering_speed: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly MGLT: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly hyperdrive_rating: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly cargo_capacity: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly consumables: string;

  @ApiProperty({ type: 'string', format: 'binary', isArray: true })
  readonly images: Express.Multer.File[];
}

export class UpdateStarshipDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly model: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly starship_class: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly manufacturer: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly cost_in_credits: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly length: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly crew: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly passengers: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly max_atmosphering_speed: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly MGLT: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly hyperdrive_rating: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly cargo_capacity: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly consumables: string;
}
