import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from '../domain/patient.entity';
import { CreatePatientDto } from '../domain/dto/create-patient.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientsRepo: Repository<Patient>,
  ) {}

  async createPatient(
    data: CreatePatientDto,
    documentPhoto: string,
  ): Promise<Patient> {
    const exists = await this.patientsRepo.findOne({
      where: { email: data.email },
    });
    if (exists) {
      throw new BadRequestException('Email already registered');
    }

    const patient = this.patientsRepo.create({
      ...data,
      documentPhoto,
    });

    return this.patientsRepo.save(patient);
  }

  async getAll(): Promise<Patient[]> {
    return this.patientsRepo.find();
  }
}
