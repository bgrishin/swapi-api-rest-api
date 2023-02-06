import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const isImageFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: (error: Error, acceptFile: boolean) => void,
) => {
  if (!Boolean(file.mimetype.match(/(jpg|jpeg|png|gif)/))) cb(null, false);
  cb(null, true);
};

export const imageOptions: MulterOptions = {
  limits: { fileSize: 5242880 },
  fileFilter: isImageFilter,
};
