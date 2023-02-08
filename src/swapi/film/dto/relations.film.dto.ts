import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional } from 'class-validator';

export class FilmRelations {
  @ApiProperty({ type: [Number], required: false })
  @IsNumber({}, { each: true })
  @IsArray()
  @IsOptional()
  characters?: number[];

  @ApiProperty({ type: [Number], required: false })
  @IsNumber({}, { each: true })
  @IsArray()
  @IsOptional()
  planets?: number[];

  @ApiProperty({ type: [Number], required: false })
  @IsNumber({}, { each: true })
  @IsArray()
  @IsOptional()
  starships?: number[];

  @ApiProperty({ type: [Number], required: false })
  @IsNumber({}, { each: true })
  @IsArray()
  @IsOptional()
  vehicles?: number[];

  @ApiProperty({ type: [Number], required: false })
  @IsNumber({}, { each: true })
  @IsArray()
  @IsOptional()
  species?: number[];
}
