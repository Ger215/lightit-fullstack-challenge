import { Test, TestingModule } from '@nestjs/testing';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from '../domain/dto/create-patient.dto';
import { BadRequestException } from '@nestjs/common';

describe('PatientsController', () => {
  let controller: PatientsController;
  let service: PatientsService;

  const mockPatientsService = {
    handlePatientCreation: jest.fn(),
    getAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientsController],
      providers: [
        {
          provide: PatientsService,
          useValue: mockPatientsService,
        },
      ],
    }).compile();

    controller = module.get<PatientsController>(PatientsController);
    service = module.get<PatientsService>(PatientsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('postPatient', () => {
    it('should create a patient successfully', async () => {
      const dto: CreatePatientDto = {
        fullName: 'Test User',
        email: 'testuser1234@gmail.com',
        countryCode: '+598',
        phoneNumber: '12345678',
      };

      const mockFile = { filename: 'test.jpg' } as any;

      const expectedPatient = {
        id: '1',
        ...dto,
        documentPhoto: mockFile.filename,
      };

      mockPatientsService.handlePatientCreation.mockResolvedValue(
        expectedPatient,
      );

      const result = await controller.postPatient(dto, mockFile);

      expect(result).toEqual({
        message: 'Patient registered successfully',
      });
      expect(service.handlePatientCreation).toHaveBeenCalledWith(dto, mockFile);
    });

    it('should throw if service throws (e.g. email duplicate)', async () => {
      const dto: CreatePatientDto = {
        fullName: 'Test User',
        email: 'testuser1234@gmail.com',
        countryCode: '+598',
        phoneNumber: '12345678',
      };

      const mockFile = { filename: 'test.jpg' } as any;

      mockPatientsService.handlePatientCreation.mockRejectedValue(
        new BadRequestException('Email already registered'),
      );

      await expect(controller.postPatient(dto, mockFile)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('getAllPatients', () => {
    it('should return an array of patients', async () => {
      const patients = [
        {
          id: '1',
          fullName: 'Test User',
          email: 'testuser1234@gmail.com',
          countryCode: '+598',
          phoneNumber: '12345678',
          documentPhoto: 'test.jpg',
        },
      ];

      mockPatientsService.getAll.mockResolvedValue(patients);

      const result = await controller.getAllPatients();

      expect(result).toEqual(patients);
      expect(service.getAll).toHaveBeenCalled();
    });
  });
});
