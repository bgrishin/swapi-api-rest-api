import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { S3 } from 'aws-sdk';
import * as fs from 'fs/promises';
import * as path from 'path';
import { Repository } from 'typeorm';
import * as uuid from 'uuid';
import { FileImage, PublicImage } from './images.entity';

const FS_LOCAL_PATH = 'src/public/images';

@Injectable()
export class ImagesService {
  private _s3: S3;

  constructor(
    private _configService: ConfigService,

    @InjectRepository(FileImage)
    private _fileImageRepository: Repository<FileImage>,

    @InjectRepository(PublicImage)
    private _publicImageRepository: Repository<PublicImage>,
  ) {
    this._s3 = new S3({
      region: this._configService.get('AWS_REGION'),
      accessKeyId: this._configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this._configService.get('AWS_SECRET_ACCESS_KEY'),
    });
  }

  async uploadPublicImages(
    images: Express.Multer.File[],
  ): Promise<PublicImage[]> {
    if (!images) return [];

    const uploadedImages = await Promise.all(
      images.map(async (publicImage) =>
        this._s3
          .upload({
            Bucket: this._configService.get('AWS_PUBLIC_BUCKET_NAME'),
            Body: publicImage.buffer,
            Key: `${uuid.v4() + path.extname(publicImage.originalname)}`,
          })
          .promise(),
      ),
    );

    const publicImages = uploadedImages.map(({ Key, Location }) => {
      const image = new PublicImage();
      image.key = Key;
      image.url = Location;
      return image;
    });

    return this._publicImageRepository.save(publicImages);
  }

  async deletePublicImages(images: PublicImage[]): Promise<void> {
    await Promise.all(
      images.map(({ key }) =>
        this._s3
          .deleteObject({
            Bucket: this._configService.get('AWS_PUBLIC_BUCKET_NAME'),
            Key: key,
          })
          .promise(),
      ),
    );
    await this._publicImageRepository.remove(images);
  }

  async uploadFileImages(images: Express.Multer.File[]): Promise<FileImage[]> {
    if (!images) return [];

    await fs.mkdir(FS_LOCAL_PATH, { recursive: true });

    const fileImagesToCreate: FileImage[] = [];
    await Promise.all(
      images.map(({ originalname, buffer }) => {
        const fileName = uuid.v4() + path.extname(originalname);
        const fileImage = new FileImage();
        fileImage.file_name = fileName;
        fileImagesToCreate.push(fileImage);
        return fs.writeFile(path.join(FS_LOCAL_PATH, fileName), buffer);
      }),
    );

    return this._fileImageRepository.save(fileImagesToCreate);
  }

  async deleteFileImages(images: FileImage[]): Promise<void> {
    await Promise.all(
      images.map(({ file_name }) =>
        fs.unlink(path.join(FS_LOCAL_PATH, file_name)),
      ),
    );
    await this._fileImageRepository.remove(images);
  }
}
