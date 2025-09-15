import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';

export const DocumentPhotoInterceptor = FileInterceptor('documentPhoto', {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = './uploads';
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueName = Date.now() + extname(file.originalname);
      cb(null, uniqueName);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.jpg$/)) {
      return cb(new Error('Only .jpg files are allowed!'), false);
    }
    cb(null, true);
  },
});
