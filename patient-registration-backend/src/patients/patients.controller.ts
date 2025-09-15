import {
  Controller,
  Post,
  Get,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from '../domain/dto/create-patient.dto';
import type { File } from 'multer';
import { DocumentPhotoInterceptor } from 'src/common/interceptors/document-photo.interceptor';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @UseInterceptors(DocumentPhotoInterceptor)
  async postPatient(
    @Body() body: CreatePatientDto,
    @UploadedFile() file: File,
  ) {
    const patient = await this.patientsService.handlePatientCreation(
      body,
      file,
    );
    return { message: 'Patient registered successfully' };
  }

  @Get()
  async getAllPatients() {
    return this.patientsService.getAll();
  }
}
