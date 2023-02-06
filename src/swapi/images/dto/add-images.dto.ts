import { ApiProperty } from '@nestjs/swagger';

export class AddImagesDto {
  @ApiProperty({ type: 'string', format: 'binary', isArray: true })
  readonly images: Express.Multer.File[];
}
