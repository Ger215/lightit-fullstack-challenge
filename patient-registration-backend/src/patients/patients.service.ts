import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from '../domain/patient.entity';
import { CreatePatientDto } from '../domain/dto/create-patient.dto';
import type { File } from 'multer';
import { existsSync, mkdirSync, unlinkSync } from 'fs';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientsRepo: Repository<Patient>,
    private readonly notificationService: NotificationsService,
  ) {}

  async handlePatientCreation(
    data: CreatePatientDto,
    file: File,
  ): Promise<Patient> {
    this.checkIfPhotoIsUploaded(file);

    const uploadPath = './uploads';
    this.checkIfPathExists(uploadPath);

    try {
      const patient = await this.createPatient(data, file.filename);

      this.notificationService
        .sendRegistrationConfirmationEmail(patient.email, patient.fullName)
        .catch((err) => console.error('Error sending email:', err));

      return patient;
    } catch (error) {
      if (file?.path) {
        try {
          unlinkSync(file.path);
        } catch (fsErr) {
          console.error('Error deleting file:', fsErr);
        }
      }
      throw new BadRequestException(error.message);
    }
  }

  private checkIfPhotoIsUploaded(file: File) {
    if (!file) {
      throw new BadRequestException('Document photo is required');
    }
  }

  private checkIfPathExists(uploadPath: string) {
    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath, { recursive: true });
    }
  }

  async createPatient(
    data: CreatePatientDto,
    documentPhoto: string,
  ): Promise<Patient> {
    const exists = await this.patientsRepo.findOne({
      where: { email: data.email },
    });
    this.userAlreadyExists(exists);

    const patient = this.patientsRepo.create({
      ...data,
      documentPhoto,
    });

    return this.patientsRepo.save(patient);
  }

  private userAlreadyExists(exists: Patient | null) {
    if (exists) {
      throw new BadRequestException('Email already registered');
    }
  }

  async getAll(): Promise<Patient[]> {
    return this.patientsRepo.find();
  }
}
