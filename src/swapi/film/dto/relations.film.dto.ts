import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';

export class FilmRelations {
  @ApiProperty({ type: [String], required: false })
  @IsArray()
  @IsOptional()
  characters?: string[];

  @ApiProperty({ type: [String], required: false })
  @IsArray()
  @IsOptional()
  planets?: string[];

  @ApiProperty({ type: [String], required: false })
  @IsArray()
  @IsOptional()
  starships?: string[];

  @ApiProperty({ type: [String], required: false })
  @IsArray()
  @IsOptional()
  vehicles?: string[];

  @ApiProperty({ type: [String], required: false })
  @IsArray()
  @IsOptional()
  species?: string[];
}
