import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from '../domain/patient.entity';
import { CreatePatientDto } from '../domain/dto/create-patient.dto';
import type { File } from 'multer';
import { existsSync, mkdirSync, unlinkSync } from 'fs';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientsRepo: Repository<Patient>,
  ) {}

  async handlePatientCreation(
    data: CreatePatientDto,
    file: File,
  ): Promise<Patient> {
    const uploadPath = './uploads';
    this.checkIfPathExists(uploadPath);

    try {
      const patient = await this.createPatient(data, file.filename);
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
