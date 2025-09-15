import { Test, TestingModule } from '@nestjs/testing';
import { PatientsService } from './patients.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Patient } from '../domain/patient.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { CreatePatientDto } from '../domain/dto/create-patient.dto';

describe('PatientsService', () => {
  let service: PatientsService;
  let repo: jest.Mocked<Repository<Patient>>;

  const mockPatient: Patient = {
    id: '1',
    fullName: 'Test User',
    email: 'testuser1234@gmail.com',
    countryCode: '+598',
    phoneNumber: '12345678',
    documentPhoto: 'test.jpg',
    createdAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientsService,
        {
          provide: getRepositoryToken(Patient),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PatientsService>(PatientsService);
    repo = module.get(getRepositoryToken(Patient));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createPatient', () => {
    it('should create and save a patient if email does not exist', async () => {
      const dto: CreatePatientDto = {
        fullName: 'Test User',
        email: 'testuser1234@gmail.com',
        countryCode: '+598',
        phoneNumber: '12345678',
      };

      (repo.findOne as jest.Mock).mockResolvedValue(null);
      (repo.create as jest.Mock).mockReturnValue(mockPatient);
      (repo.save as jest.Mock).mockResolvedValue(mockPatient);

      const result = await service.createPatient(dto, 'test.jpg');

      expect(repo.findOne).toHaveBeenCalledWith({
        where: { email: dto.email },
      });
      expect(repo.create).toHaveBeenCalledWith({
        ...dto,
        documentPhoto: 'test.jpg',
      });
      expect(repo.save).toHaveBeenCalledWith(mockPatient);
      expect(result).toEqual(mockPatient);
    });

    it('should throw if email already exists', async () => {
      (repo.findOne as jest.Mock).mockResolvedValue(mockPatient);

      await expect(
        service.createPatient(
          {
            fullName: 'Other',
            email: mockPatient.email,
            countryCode: '+598',
            phoneNumber: '87654321',
          },
          'test.jpg',
        ),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('getAll', () => {
    it('should return an array of patients', async () => {
      (repo.find as jest.Mock).mockResolvedValue([mockPatient]);

      const result = await service.getAll();

      expect(repo.find).toHaveBeenCalled();
      expect(result).toEqual([mockPatient]);
    });
  });

  describe('handlePatientCreation', () => {
    it('should throw if file is missing', async () => {
      const dto: CreatePatientDto = {
        fullName: 'Test User',
        email: 'testuser1234@gmail.com',
        countryCode: '+598',
        phoneNumber: '12345678',
      };

      await expect(
        service.handlePatientCreation(dto, undefined as any),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
