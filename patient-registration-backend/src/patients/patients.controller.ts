import {
  Controller,
  Post,
  Get,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from '../domain/dto/create-patient.dto';
import type { File } from 'multer';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('documentPhoto', {
      storage: diskStorage({
        destination: './uploads',
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
    }),
  )
  async postPatient(
    @Body() body: CreatePatientDto,
    @UploadedFile() file: File,
  ) {
    const patient = await this.patientsService.createPatient(
      body,
      file.filename,
    );
    return { message: 'Patient registered successfully' };
  }

  @Get()
  async getAllPatients() {
    return this.patientsService.getAll();
  }
}
