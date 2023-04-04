import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePersonDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly birth_year: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly gender: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly height: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly mass: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly eye_color: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly hair_color: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly skin_color: string;

  @ApiProperty({ type: 'string', format: 'binary', isArray: true })
  readonly images: Express.Multer.File[];
}

export class UpdatePersonDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly birth_year: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly gender: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly height: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly mass: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly eye_color: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly hair_color: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly skin_color: string;
}
