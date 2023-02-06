import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFilmDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly episode_id: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly opening_crawl: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly director: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly producer: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly release_date: string;

  @ApiProperty({ type: 'string', format: 'binary', isArray: true })
  readonly images: Express.Multer.File[];
}
