import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSpecieDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly classification: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly designation: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly average_height: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly average_lifespan: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly eye_colors: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly hair_colors: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly language: string;

  @ApiProperty({ type: 'string', format: 'binary', isArray: true })
  readonly images: Express.Multer.File[];
}

export class UpdateSpecieDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly classification: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly designation: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly average_height: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly average_lifespan: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly eye_colors: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly hair_colors: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly language: string;
}
